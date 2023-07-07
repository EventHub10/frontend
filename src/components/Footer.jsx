function Footer() {
  return (
    <footer className="px-16 py-6 bg-black text-white min-h-min flex md:flex-row flex-col items-center justify-between gap-3">
      <span className="text-sm text-center">
        Copyright © - EventHub. Todos os direitos reservados.
      </span>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/orgs/EventHub10/repositories"
        className="min-h-min"
      >
        <img src="assets/github-icon.png" alt="GitHub" />
      </a>
    </footer>
  );
}

export default Footer;
