import {
  Avatar,
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
  Typography,
  Upload,
} from "antd";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StarOutlined, UploadOutlined } from "@ant-design/icons";
import {
  getVehicleListFail,
  getVehicleListRequest,
  getVehicleListSuccess,
} from "../slices/VehicleInductionSlice";
import axios from "axios";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { updateVehicleList } from "../action/getVehicleAction";

const VehicleList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingVehicleList, setEditingVehicleList] = useState(null);
  const fetchVehicleListData = useCallback(async () => {
    try {
      dispatch(getVehicleListRequest());
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/vehicle_list"
      );

      dispatch(getVehicleListSuccess(data));
      setData(
        data.map((vehicle) => ({
          key: vehicle._id,
          id: vehicle._id,
          Registration_No: vehicle.vehicle_regnumber,
          PCC: vehicle.vehicle_puc,
          Vehicle_Type: vehicle.vehicle_type,
          Model: vehicle.vehicle_model,
        }))
      );
    } catch (error) {
      dispatch(getVehicleListFail());
    }
  }, [dispatch]);
  useEffect(() => {
    fetchVehicleListData();
  }, [fetchVehicleListData]);

  const columns = [
    {
      title: "Registration_No",
      dataIndex: "Registration_No",
      width: "25%",
      editable: true,
    },
    {
      title: "Vehicle_Type",
      dataIndex: "Vehicle_Type",
      editable: true,
    },
    {
      title: "PCC",
      dataIndex: "PCC",
      maxWidth: 50,
      render: (t, r) => <Image src={r.PCC} />,
    },

    {
      title: "Model",
      dataIndex: "Model",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined style={{ color: "red", marginLeft: 12 }} />
          </>
        );
      },
    },
  ];
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingVehicleList({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingVehicleList(null);
  };
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "xxx.png",
      status: "done",
    },
  ]);
  return (
    <>
      <div className="container">
        <Table bordered dataSource={data} columns={columns} />
        <Modal
          title="Edit Vehicle"
          open={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setData((pre) => {
              return pre.map((vehicle) => {
                if (vehicle.id === editingVehicleList.id) {
                  console.log(editingVehicleList);
                  const formData = new FormData();
                  formData.append(
                    "vehicle_regnumber",
                    editingVehicleList.Registration_No
                  );
                  formData.append(
                    "vehicle_type",
                    editingVehicleList.Vehicle_Type
                  );
                  formData.append("vehicle_model", editingVehicleList.Model);
                  dispatch(updateVehicleList(editingVehicleList.key, formData));
                  return editingVehicleList;
                } else {
                  return vehicle;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingVehicleList?.Registration_No}
            onChange={(e) => {
              setEditingVehicleList((pre) => {
                return { ...pre, Registration_No: e.target.value };
              });
            }}
          />
          <Input
            value={editingVehicleList?.Vehicle_Type}
            onChange={(e) => {
              setEditingVehicleList((pre) => {
                return { ...pre, Vehicle_Type: e.target.value };
              });
            }}
          />
          <Input
            value={editingVehicleList?.Model}
            onChange={(e) => {
              setEditingVehicleList((pre) => {
                return { ...pre, Model: e.target.value };
              });
            }}
          />
          <Upload showUploadList={true} fileList={fileList}>
            <Button>Upload File</Button>
          </Upload>
        </Modal>
      </div>
    </>
  );
};
export default VehicleList;
