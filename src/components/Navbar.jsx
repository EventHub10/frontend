import { Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        <h1 className="font-bold text-lg">Explorar eventos</h1>
        <p>Encontre seu próximo evento em nosso calendário.</p>
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        <h1 className="font-bold text-lg">Cadastrar evento</h1>
        <p>Crie um evento.</p>
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        <h1 className="font-bold text-lg">Minha conta</h1>
        <p>Confira seu perfil e seus eventos.</p>
      </a>
    ),
  },
  {
    key: "4",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        <h1 className="font-bold text-lg text-red-500">Sair</h1>
      </a>
    ),
  },
];

function Navbar() {
  return (
    <nav className="px-16 py-2 bg-black text-white h-16 flex items-center justify-between">
      <img src="/assets/EventHub.png" alt="EventHub" className="w-32 h-auto" />
      <Dropdown
        menu={{
          items,
        }}
        placement="bottom"
      >
        <MenuOutlined className="text-white text-xl" />
      </Dropdown>
    </nav>
  );
}

export default Navbar;
