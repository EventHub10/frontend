import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/actions";

import { Dropdown, Input } from "antd";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logout = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("userId", null);
    dispatch(updateUser({}));
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to="/">
          <h1 className="font-bold text-lg">Explorar eventos</h1>
          <p>Encontre seu próximo evento em nosso calendário.</p>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={user.id ? "/create-event" : "/login"}>
          <h1 className="font-bold text-lg">Cadastrar evento</h1>
          <p>Crie um evento.</p>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to={user.id ? "/profile" : "/login"}>
          <h1 className="font-bold text-lg">Minha conta</h1>
          <p>Confira seu perfil e seus eventos.</p>
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <>
          {user.id ? (
            <a onClick={logout}>
              <h1 className="font-bold text-lg text-red-500">Sair</h1>
            </a>
          ) : (
            <Link to={user.id ? "/profile" : "/login"}>
              <h1 className="font-bold text-lg">Fazer login ou cadastro</h1>
              <p>Faça parte da comunidade EventHub.</p>
            </Link>
          )}
        </>
      ),
    },
  ];
  return (
    <nav className="md:px-16 px-6 py-2 bg-black text-white h-16 flex items-center justify-between">
      <img src="/assets/EventHub.png" alt="EventHub" className="w-32 h-auto" />
      <Dropdown
        menu={{
          items,
        }}
        placement="bottom"
      >
        <div className="flex gap-4">
          <Input
            prefix={<SearchOutlined className="primary-color" />}
            type="text"
            placeholder="Buscar Eventos..."
            className="custom-input rounded-2xl"
          />
          <MenuOutlined className="text-white text-xl" />
        </div>
      </Dropdown>
    </nav>
  );
}

export default Navbar;
