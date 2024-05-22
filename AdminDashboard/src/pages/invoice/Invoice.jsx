import {
  Avatar,
  Button,
  Flex,
  Modal,
  Row,
  Table,
  Typography,
  Col,
  Select,
  Menu,
  notification,
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { fetchInvoiceRequest } from "../../redux/actions/Invoice";

const status = ["Chờ xác nhận", "Chờ giao hàng", "Đã giao hàng", "Đã hủy"];

const Invoice = () => {
  const invoiceData = useSelector((state) => state.invoiceReducer.data);
  const [openDialogDetail, setOpenDialogDetail] = useState(false);
  const [selectInvoiceItem, setSelectInvoiceItem] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const showModelDetail = (item) => {
    console.log(item);
    setSelectInvoiceItem(item);
    setOpenDialogDetail(true);
  };

  const hideModelDetail = () => {
    setSelectInvoiceItem(null);
    setOpenDialogDetail(false);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Sản phẩm",
      dataIndex: "productsOrder",
      key: "nameProduct",
      width: "30%",
      render: (record) => {
        return (
          <div>
            {record?.map((product, index) => (
              <div
                key={index}
                className={`flex flex-row p-1  items-center ${
                  index !== 0 ? "border-t" : ""
                } ${index !== record.length - 1 ? "border-b" : ""}`}
              >
                <Avatar src={product.option_id.image} className="mr-1" />
                <Typography className="w-[80%]">
                  {product.option_id.product_id?.name}
                </Typography>
                <Typography>Số lượng: {product.quantity}</Typography>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Tên người đặt",
      dataIndex: "info_id",
      key: "nameUser",
      sorter: (a, b) => {
        console.log(a, b);
        return;
      },
      render: (record) => {
        console.log(record);
        return <div>{record?.name}</div>;
      },
    },
    {
      title: "Tổng tiền hóa đơn",
      dataIndex: "total_price",
      key: "totalPrice",

      render: (text) => (
        <Typography>{text ? text.toLocaleString("vi-VN") : ""} đ</Typography>
      ),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "",
      key: "action",
      render: (record) => {
        return (
          <Button type="link" onClick={() => showModelDetail(record)}>
            chi tiết
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-end m-3">
        <Select
          style={{
            width: 300,
            marginLeft: 10,
          }}
          allowClear
          size="middle"
          placeholder="chọn trạng thái đơn hàng"
          onChange={(value) => {
            console.log(value);
            setSelectedStatus(value);
            dispatch(fetchInvoiceRequest(token, value));
          }}
          options={status.map((status) => ({
            label: status,
            value: status,
          }))}
        />
      </div>
      <Table
        columns={columns}
        dataSource={invoiceData?.result}
        bordered
        rowKey={(record) => record._id}
      />
      <Modal
        open={openDialogDetail}
        onCancel={hideModelDetail}
        footer={null}
        width={"50%"}
      >
        <DetailContent data={selectInvoiceItem} close={hideModelDetail} />
      </Modal>
    </div>
  );
};

const DetailContent = ({ data, close }) => {
  const formattedDate = (date) => moment(date).format("HH:mm DD/MM/YYYY");
  const isCancelled = data.status === "Đã hủy";
  const isCompleted = data.status === "Đã giao hàng";
  const isPending = data.status === "Chờ giao hàng";
  const isWaitComfirm = data.status === "Chờ xác nhận";
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const handleAction = (action) => {
    switch (action) {
      case "confirm":
        axios
          .put(
            `${import.meta.env.VITE_BASE_URL}order/update-order-status/${
              data._id
            }`,
            { status: "Chờ giao hàng" },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            dispatch(fetchInvoiceRequest(token));
            close();
            notification.success({
              message: "Thành công",
              description: "Upate trạng thái đơn hàng thành công!",
              duration: 3,
              type: "success",
            });
          })
          .catch((error) => {
            console.log(error);
            notification.error({
              error: "Thất Bại",
              description: "Upate trạng thái đơn hàng thất bại",
              duration: 3,
              type: "error",
            });
          });
        break;

      case "delivery":
        axios
          .put(
            `${import.meta.env.VITE_BASE_URL}order/update-order-status/${
              data._id
            }`,
            { status: "Đã giao hàng" },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            dispatch(fetchInvoiceRequest(token));
            close();
            notification.success({
              message: "Thành công",
              description: "Upate trạng thái đơn hàng thành công!",
              duration: 3,
              type: "success",
            });
          })
          .catch((error) => {
            console.log(error);
            notification.error({
              error: "Thất Bại",
              description: "Upate trạng thái đơn hàng thất bại",
              duration: 3,
              type: "error",
            });
          });
        break;

      case "cancel":
        axios
          .put(
            `${import.meta.env.VITE_BASE_URL}order/update-order-status/${
              data._id
            }`,
            { status: "Đã hủy" },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            dispatch(fetchInvoiceRequest(token));
            close();
            notification.success({
              message: "Thành công",
              description: "Upate trạng thái đơn hàng thành công!",
              duration: 3,
              type: "success",
            });
          })
          .catch((error) => {
            console.log(error);
            notification.error({
              error: "Thất Bại",
              description: "Upate trạng thái đơn hàng thất bại",
              duration: 3,
              type: "error",
            });
          });
        break;

      default:
        break;
    }
  };

  return (
    <Flex vertical>
      <div className="flex justify-between items-start py-5">
        <div className="flex flex-col">
          <Typography.Title level={4} style={{ margin: 0 }}>
            Mã hóa đơn: {data._id}
          </Typography.Title>
          <Typography.Text className="text-base">
            Ngày tạo: {formattedDate(data.createdAt)}
          </Typography.Text>
          {isCancelled ? (
            <Typography.Text className="text-red-600 text-base">
              Ngày hủy: {formattedDate(data.updatedAt)}
            </Typography.Text>
          ) : isCompleted ? (
            <Typography.Text className="text-base text-green-600">
              Ngày hoàn thành: {formattedDate(data.createdAt)}
            </Typography.Text>
          ) : (
            <Typography.Text className="text-base">
              Ngày hoàn thành: chưa hoàn thành
            </Typography.Text>
          )}
        </div>
        <div className="flex flex-col">
          <Typography.Title style={{ margin: 0 }} level={4}>
            Tổng tiền: {data.total_price.toLocaleString("vi-VN")} đ
          </Typography.Title>
          <Typography.Title style={{ margin: 0 }} level={5}>
            Trạng thái đơn hàng: {data.status}
          </Typography.Title>
        </div>
      </div>
      <div>
        <Row>
          <Col span={14}>
            {data?.productsOrder.map((product, index) => {
              return (
                <div key={index} className="flex border m-1 p-1 rounded-md">
                  <img
                    src={product.option_id.image}
                    className="w-20 object-contain"
                  />
                  <div className="flex flex-col ml-2">
                    <Typography.Text className="text-base text-black font-semibold">
                      {product.option_id.product_id.name} -{" "}
                      {product.option_id.price.toLocaleString("vi-VN")} đ
                    </Typography.Text>
                    <Typography.Text>
                      màu sản phẩm: {product.option_id.name_color}
                    </Typography.Text>
                    <Typography.Text>
                      Số lượng mua: {product.quantity}
                    </Typography.Text>
                    <Typography.Text>
                      Tổng tiền :{" "}
                      {(
                        product.quantity * product.option_id.price
                      ).toLocaleString("vi-VN")}{" "}
                      đ
                    </Typography.Text>
                  </div>
                </div>
              );
            })}
          </Col>
          <Col span={10} className="border-l">
            <Flex vertical>
              <Typography.Title level={5}>Thông tin người đặt</Typography.Title>
              <Typography.Text className="text-base">
                Tên người đặt: {data.info_id?.name}
              </Typography.Text>
              <Typography.Text className="text-base">
                Số điện thoại người đặt: {data.info_id?.phone_number}
              </Typography.Text>
              <Typography.Text className="text-base">
                Địa chỉ người đặt: {data.info_id?.address}
              </Typography.Text>
              <Button
                onClick={() => handleAction("confirm")}
                type="primary"
                disabled={isWaitComfirm ? false : true}
                className="bg-[#407cff] "
              >
                Xác nhận đơn hàng
              </Button>
              <Button
                onClick={() => handleAction("delivery")}
                type="primary"
                disabled={isPending ? false : true}
                className="bg-[#407cff]  mt-2"
              >
                Giao hàng
              </Button>
              <Button
                onClick={() => handleAction("cancel")}
                type="default"
                disabled={isWaitComfirm ? false : true}
                danger
                className="  mt-2"
              >
                Hủy đơn hàng
              </Button>
            </Flex>
          </Col>
        </Row>
      </div>
    </Flex>
  );
};

export default Invoice;
