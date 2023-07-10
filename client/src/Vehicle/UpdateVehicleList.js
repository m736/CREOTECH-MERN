import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Upload,
  theme,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addVehicleFail,
  addVehicleRequest,
  addVehicleSuccess,
  clearAddVehicleCreated,
  clearError,
} from "../slices/VehicleInductionSlice";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const AdvancedSearchForm = () => {
  const { loading, isVehicleListCreated, error } = useSelector(
    (state) => state.VechicleInductionState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [regdate, setRegDate] = useState([]);
  const [taxdate, setTaxDate] = useState([]);
  const [fitnesdate, setFitnesDate] = useState([]);
  const [insurancedate, setInsuranceDate] = useState([]);
  const { id:vehicleListId } = useParams();
  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };
  const getFile = (e) => {
    console.log("Upload event:", e?.fileList[0]?.originFileObj);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e?.fileList[0]?.originFileObj;
  };
  const onFinish = async (values) => {
    console.log(values);
    const newvalue = {
      ...values,
      RegDate: moment(new Date(regdate)).format("DD-MM-YYYY"),
      TaxDate: moment(new Date(taxdate)).format("DD-MM-YYYY"),
      FitnessDate: moment(new Date(fitnesdate)).format("DD-MM-YYYY"),
      InsuranceDate: moment(new Date(insurancedate)).format("DD-MM-YYYY"),
    };

    const formData = new FormData();
    formData.append("vehicle_regnumber", newvalue.vehicle_regnumber);
    formData.append("vehicle_type", newvalue.vehicle_type);
    formData.append("vehicle_model", newvalue.vehicle_model);
    formData.append("vehicle_clientname", newvalue.vehicle_clientname);
    formData.append("vehicle_regdate_exp", newvalue.RegDate);
    formData.append("vehicle_taxdate_exp", newvalue.TaxDate);
    formData.append("vehicle_fitnessdate_exp", newvalue.FitnessDate);
    formData.append("vehicle_insurancedate_exp", newvalue.InsuranceDate);

    formData.append("vehicle_puc", newvalue.vehicle_puc);
    try {
      dispatch(addVehicleRequest());
      const { data } = await axios.post(
        `http://localhost:4000/vehicle/addvehicle`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      dispatch(addVehicleSuccess(data));
    } catch (error) {
      dispatch(addVehicleFail(error.response.data.message));
    }
  };

//   useEffect(() => {
//     if (isVehicleListCreated) {
//       toast("New Vehicle Created Succesfully!", {
//         type: "success",
//         position: toast.POSITION.BOTTOM_CENTER,
//         onOpen: () => dispatch(clearAddVehicleCreated()),
//       });
//       navigate("/vechicle-list");
//       return;
//     }

//     if (error) {
//       toast(error, {
//         position: toast.POSITION.BOTTOM_CENTER,
//         type: "error",
//         onOpen: () => {
//           dispatch(clearError());
//         },
//       });
//       return;
//     }
//   }, [isVehicleListCreated, error, dispatch]);



useEffect(() => {
    if(product._id) {
        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
        setDescription(product.description);
        setSeller(product.seller);
        setCategory(product.category);
        
        let images = [];
        product.images.forEach( image => {
            images.push(image.image)
        });
        setImagesPreview(images)
    }
},[product])

  return (
    <>
      <div className="container">
        <h3 className="text-center py-3 text-bold">Update-Vehicle</h3>
        <Form
          form={form}
          name="add-vehicle"
          style={formStyle}
          onFinish={onFinish}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="vehicle_regnumber" label="Registration Number">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="vehicle_type" label="Vehicle Type">
                <Select>
                  <Option value="TT">TT</Option>
                  <Option value="DZIRE">DZIRE</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="vehicle_model"
                label="Make (Model)"
                rules={[
                  {
                    type: "text",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="vehicle_clientname" label="Client Name">
                <Select>
                  <Option value="APC">APC</Option>
                  <Option value="IBM">IBM</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="vehicle_regdate_exp" label="Registration Date">
                <DatePicker
                  onChange={(x) => {
                    setRegDate(x);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="vehicle_taxdate_exp" label="Tax Expiry">
                <DatePicker
                  onChange={(x) => {
                    setTaxDate(x);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="vehicle_fitnessdate_exp" label="Fitness Expiry">
                <DatePicker
                  onChange={(x) => {
                    setFitnesDate(x);
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="vehicle_puc"
                label="PUC"
                getValueFromEvent={getFile}
              >
                <Upload
                  customRequest={(info) => {
                    setFileList([info.file]);
                  }}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                  {fileList[0]?.name}
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <div
            style={{
              textAlign: "right",
            }}
          >
            <Space size="small">
              <Button
                type="primary"
                htmlType="submit"
                disabled={loading ? <Spin /> : null}
              >
                Submit
              </Button>
              <Button
                onClick={() => {
                  form.resetFields();
                }}
              >
                Clear
              </Button>
            </Space>
          </div>
        </Form>
      </div>
    </>
  );
};
const UpdateVehicleList = () => {
  return (
    <>
      <AdvancedSearchForm />
    </>
  );
};
export default UpdateVehicleList;
