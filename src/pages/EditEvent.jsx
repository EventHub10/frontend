import { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateEvents } from "../store/actions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const EditEvent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

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

  const onFinish = async (values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };

    const formEvent = {
      id: params.eventId,
      event_title: values.event_title,
      description: values.description,
      event_photo: values.event_photo,
      location: values.location,
      event_price: values.event_price,
      link_to_buy: values.link_to_buy,
      event_date: values.event_date,
    };

    try {
      const result = await axios.put(
        "http://localhost:5101/api/event",
        formEvent,
        config
      );

      if (result.status === 200) {
        const _events = await axios.get(
          "http://localhost:5101/api/event",
          config
        );
        dispatch(updateEvents(_events.data));
        success();
        navigate("/");
      }
    } catch (exception) {
      console.error(exception.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    error();
    console.log("Error:", errorInfo);
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };

  const deleteEvent = async () => {
    try {
      const result = await axios.delete(
        `http://localhost:5101/api/event/${params.eventId}`,
        config
      );

      if (result.status === 200) {
        navigate("/");
      }
    } catch (exception) {
      console.error("Erro ao excluir evento.");
    }
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

  const getEventById = async (id) => {
    try {
      const result = await axios.get(`http://localhost:5101/api/event/${id}`);
      if (result.status === 200) {
        result.data.event_date = dayjs(result.data.event_date).format(
          "YYYY-MM-DD"
        );
        form.setFieldsValue(result.data);
        setPhotoLink(result.data.event_photo);
      }
    } catch (exception) {
      console.error("Aconteceu algum erro. Recarregue a página.");
    }
  };

  useEffect(() => {
    getEventById(params.eventId);
  }, [navigate, params.eventId]);

  return (
    <div className="flex flex-col items-center">
      {contextHolder}
      <h1 className="text-center text-white text-3xl font-bold mx-8 mt-8 mb-4">
        Editar evento
      </h1>
      <img src={photoLink} className="w-[100px] h-[100px] rounded-full" />
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
          name="event_title"
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
          name="event_photo"
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
          name="event_price"
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
