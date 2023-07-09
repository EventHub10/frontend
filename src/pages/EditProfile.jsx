import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Form, Input, message } from "antd";

const EditProfile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [photoLink, setPhotoLink] = useState("");
  const [inputPhoto, setInputPhoto] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const user = {
    name: "Jorge Douglas",
    email: "jorge@gmail.com",
    password: "12345678",
    photo:
      "https://media.istockphoto.com/id/1270987867/pt/foto/close-up-young-smiling-man-in-casual-clothes-posing-isolated-on-blue-wall-background-studio.jpg?s=612x612&w=0&k=20&c=yl2rYQMNKmFqNOSaKplUd8doJAnEuTHEZcmUI45XkJo=",
    user_events: [],
    id: "1243dsvbvarare",
  };

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

  const onFinish = (values) => {
    let formUser = {
      name: values.name,
      photo: values.photo,
    };
    const userUpdated = { ...user, ...formUser };
    console.log("event: ", userUpdated);
    success();
    form.resetFields();
    setPhotoLink("");
    navigate("/profile");
  };

  const onFinishFailed = (errorInfo) => {
    error();
    console.log("Failed:", errorInfo);
  };

  const isImageLink = (link) => {
    const imageRegex = /\.(jpeg|jpg|gif|png)/i;
    return imageRegex.test(link);
  };

  useEffect(() => {
    if (isImageLink(inputPhoto)) {
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
    setPhotoLink(form.getFieldValue().photo);
  }, [user, form]);

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
