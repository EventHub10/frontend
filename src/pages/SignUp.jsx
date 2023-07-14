import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import {
  LockOutlined,
  UserOutlined,
  PictureOutlined,
  MailOutlined,
} from "@ant-design/icons";

const SignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Usuário cadastrado com sucesso.",
      duration: 3,
    });
  };

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
      duration: 3,
    });
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const onFinish = async (values) => {
    const formUser = {
      name: values.name,
      email: values.email,
      password: values.password,
      photo: values.photo,
    };
    try {
      let result = await axios.post(
        `http://localhost:5101/api/user/`,
        formUser,
        config
      );
      if (result.status === 200) {
        success();
        form.resetFields();
        navigate("/login");
      }
    } catch (e) {
      error(e.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    error();
    console.error("Error:", errorInfo);
  };

  return (
    <div className="flex flex-col items-center">
      {contextHolder}
      <h1 className="text-center text-white text-3xl font-bold mx-8">
        Cadastro
      </h1>
      <p className="text-center text-white mx-8">
        Crie sua conta e faça parte da comunidade EventHub.
      </p>
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
          <Input
            prefix={<UserOutlined className="primary-color" />}
            type="text"
            placeholder="Nome"
            className="custom-input"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Coloque o seu melhor email." }]}
        >
          <Input
            prefix={<MailOutlined className="primary-color" />}
            type="text"
            placeholder="Email"
            className="custom-input"
          />
        </Form.Item>

        <Form.Item name="photo" rules={[{ required: true }]}>
          <Input
            prefix={<PictureOutlined className="primary-color" />}
            type="name"
            placeholder="Link da foto de perfil"
            className="custom-input"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Defina sua senha." }]}
        >
          <Input
            prefix={<LockOutlined className="primary-color" />}
            type="password"
            placeholder="Senha"
            className="custom-input"
          />
        </Form.Item>

        <Form.Item>
          <Button className="primary-button" htmlType="submit" block>
            CRIAR UMA CONTA
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
