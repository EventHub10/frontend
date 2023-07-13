import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Button, Form, Input, message } from "antd";

const SignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [photoLink, setPhotoLink] = useState("");
  const [inputPhoto, setInputPhoto] = useState("");

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Evento criado com sucesso!",
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

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token"),
    },
  };

  const onFinish = async (values) => {
    const formEvent = {
      ownerId: localStorage.getItem("userId") ?? null,
      event_title: values.title,
      event_photo: values.photo,
      event_date: values.event_date,
      event_price: values.price,
      link_to_buy: values.link_to_buy,
      location: values.location,
      description: values.description,
    };

    try {
      const result = await axios.post(
        `http://localhost:5101/api/event/`,
        formEvent,
        config
      );
      if (result.status === 200) {
        success();
        form.resetFields();
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      error(e);
    }
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    error();
    console.log("Failed:", errorInfo);
  };

  function isImageLink(link) {
    const imageRegex = /\.(jpeg|jpg|gif|png)/i;
    return imageRegex.test(link);
  }

  useEffect(() => {
    if (isImageLink(inputPhoto)) {
      setPhotoLink(inputPhoto);
    } else {
      setPhotoLink(
        "https://www.steaua-dunarii.ro/client/img/image-not-found.png"
      );
    }
  }, [inputPhoto]);

  return (
    <div className="flex flex-col items-center">
      {contextHolder}
      <h1 className="text-center text-white text-3xl font-bold mx-8 mt-8 mb-4">
        Criar evento
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
          name="title"
          rules={[{ required: true, message: "Coloque o título do evento." }]}
        >
          <Input type="text" placeholder="Título" className="custom-input" />
        </Form.Item>

        <Form.Item
          name="description"
          rules={[
            { required: true, message: "Coloque a descrição do evento." },
          ]}
        >
          <Input type="text" placeholder="Descrição" className="custom-input" />
        </Form.Item>

        <Form.Item
          name="photo"
          rules={[{ required: true, message: "Coloque o banner do evento." }]}
        >
          <Input
            type="text"
            placeholder="Link do banner do evento"
            className="custom-input"
            value={inputPhoto}
            onChange={(e) => setInputPhoto(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="location"
          rules={[{ required: true, message: "Coloque o local do evento." }]}
        >
          <Input type="text" placeholder="Local" className="custom-input" />
        </Form.Item>

        <Form.Item
          name="price"
          rules={[
            {
              required: true,
              message: "Coloque o preço do ingresso pro evento.",
            },
          ]}
        >
          <Input type="number" placeholder="Preço" className="custom-input" />
        </Form.Item>

        <Form.Item
          name="link_to_buy"
          rules={[
            {
              required: true,
              message: "Coloque o link para comprar o ingresso do evento.",
            },
          ]}
        >
          <Input
            type="text"
            placeholder="Link para comprar ingresso do evento"
            className="custom-input"
          />
        </Form.Item>

        <Form.Item
          name="event_date"
          rules={[{ required: true, message: "Coloque a data do evento." }]}
        >
          <Input type="date" className="custom-input" />
        </Form.Item>

        <Form.Item>
          <Button className="primary-button" htmlType="submit" block>
            CRIAR EVENTO
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
