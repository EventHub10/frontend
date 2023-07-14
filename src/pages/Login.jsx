import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/actions";

import { Button, Form, Input, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
      duration: 3,
    });
  };

  const onFinish = async (values) => {
    try {
      const result = await axios.post(
        `http://localhost:5101/api/user/login?email=${values.email}&senha=${values.password}`
      );
      if (result.status === 200) {
        const {token, user} = result.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id);
        form.resetFields();
        console.log("result: ", result);
        console.log("user 1", user);
        dispatch(updateUser(result.data.user));
        console.log("user 2", user);
        navigate("/");
      }
    } catch (er) {
      console.error('Erro: ', er)
      error("Usuário ja existe ou senha incorreta.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    error("Preencha todos os campos do formulário");
    console.log("Failed:", errorInfo);
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center">
      {contextHolder}
      <p className="text-white">user: {user.token}</p>
      <h1 className="text-center text-white text-3xl font-bold mx-8">Login</h1>
      <p className="text-center text-white mx-8">
        Faça login para criar eventos e compartilhar com seus amigos.
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
          name="email"
          rules={[{ required: true, message: "Digite seu email." }]}
        >
          <Input
            prefix={<MailOutlined className="primary-color" />}
            type="text"
            placeholder="Email"
            className="custom-input"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Digite sua senha." }]}
          className="mb-0"
        >
          <Input
            prefix={<LockOutlined className="primary-color" />}
            type="password"
            placeholder="Senha"
            className="custom-input"
          />
        </Form.Item>

        <Form.Item className="mb-3">
          <Button className="primary-button" htmlType="submit" block>
            ENTRAR
          </Button>
        </Form.Item>
      </Form>
      <div className="md:w-[600px] w-full px-8">
        <Button
          className="secondary-button"
          htmlType="submit"
          block
          onClick={navigateToSignup}
        >
          CRIAR UMA CONTA
        </Button>
      </div>
    </div>
  );
};

export default Login;
