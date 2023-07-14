import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/actions";

import { Button, Form, Input, message } from "antd";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [photoLink, setPhotoLink] = useState("");
  const [inputPhoto, setInputPhoto] = useState(user.photo);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Perfil atualizado com sucesso!",
      duration: 3,
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Preencha todos os campos do formulário",
      duration: 3,
    });
  };

  const onFinish = async (values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };

    let formUser = {
      id: user.id,
      name: values.name,
      photo: values.photo,
      email: user.email,
      password: user.password,
    };

    try {
      let result = await axios.put(
        "http://localhost:5101/api/user",
        formUser,
        config
      );
      if (result.status === 200) {
        success();
        dispatch(updateUser(result.data));
        form.resetFields();
        navigate("/profile");
      }
    } catch (exception) {
      onFinishFailed(exception.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    error();
    console.log("Error:", errorInfo);
  };

  useEffect(() => {
    if (inputPhoto) {
      setPhotoLink(inputPhoto);
    } else {
      setPhotoLink(
        "https://www.steaua-dunarii.ro/client/img/image-not-found.png"
      );
    }
  }, [inputPhoto]);

  useEffect(() => {
    const initialValues = {
      name: user.name,
      photo: user.photo,
    };
    form.setFieldsValue(initialValues);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {contextHolder}
      <h1 className="text-center text-white text-3xl font-bold mx-8 mt-8 mb-4">
        Editar perfil
      </h1>
      <img src={photoLink} className="w-[100px] h-[100px] rounded-full" />
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="md:w-[600px] w-full p-8"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Coloque o seu nome." }]}
        >
          <Input type="text" placeholder="Nome" className="custom-input" />
        </Form.Item>

        <Form.Item
          name="photo"
          rules={[
            { required: true, message: "Coloque o link da foto de perfil." },
          ]}
        >
          <Input
            type="text"
            placeholder="Link da foto de perfil"
            className="custom-input"
            value={inputPhoto}
            onChange={(e) => setInputPhoto(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button className="primary-button" htmlType="submit" block>
            ATUALIZAR PERFIL
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfile;
