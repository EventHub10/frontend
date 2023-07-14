import { useState, useEffect } from "react";

import { Button, Form, Input, message } from "antd";

const EditEvent = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [photoLink, setPhotoLink] = useState("");
  const [inputPhoto, setInputPhoto] = useState("");

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Evento atualizado com sucesso!",
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
    let formEvent = {
      title: values.title,
      description: values.description,
      photo: values.photo,
      location: values.location,
      price: values.price,
      link_to_buy: values.link_to_buy,
      date: values.event_date,
      confirmed_people: [],
      organizer: "import from user",
    };
    console.log("event: ", formEvent);
    success();
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    error();
    console.log("Failed:", errorInfo);
  };

  const isImageLink = (link) => {
    const imageRegex = /\.(jpeg|jpg|gif|png)/i;
    return imageRegex.test(link);
  };

  const deleteEvent = () => {
    console.log('deletar')
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

  useEffect(() => {
    const initialValues = {
      title: "Festa do peao",
      description: "evento rapido",
      photo:
        "https://media.istockphoto.com/id/1270987867/pt/foto/close-up-young-smiling-man-in-casual-clothes-posing-isolated-on-blue-wall-background-studio.jpg?s=612x612&w=0&k=20&c=yl2rYQMNKmFqNOSaKplUd8doJAnEuTHEZcmUI45XkJo=",
      location: "Palacio Sunset",
      price: 10,
      link_to_buy: "https://byma.com.br/event/6491f300b575750008d79e1f",
      event_date: "2023-08-03",
      confirmed_people: ["id123", "id2345"],
      organizer: "Michael Douglas",
      id: "t4rwfwq133vd",
    };
    form.setFieldsValue(initialValues);
    setPhotoLink(form.getFieldValue().photo);
  }, [form]);

  return (
    <div className="flex flex-col items-center">
      {contextHolder}
      <h1 className="text-center text-white text-3xl font-bold mx-8 mt-8 mb-4">
        Criar evento
      </h1>
      <img src={photoLink} className="w-[100px] h-[100px] rounded-full" />
      <p className="text-xs text-white mt-2">
        id do evento: {form.length > 0 && form.getFieldValue().id}
      </p>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="md:w-[600px] w-full p-8 pb-0"
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

        <Form.Item className="mb-3">
          <Button className="primary-button" htmlType="submit" block>
            ATUALIZAR EVENTO
          </Button>
        </Form.Item>
      </Form>
      <div className="md:w-[600px] w-full px-8 pt-0 pb-8">
        <Button
          className="delete-button"
          htmlType="submit"
          block
          onClick={deleteEvent}
        >
          EXCLUIR EVENTO
        </Button>
      </div>
    </div>
  );
};

export default EditEvent;
