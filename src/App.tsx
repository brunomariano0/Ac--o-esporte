import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  CirclePlay,
  Menu,
  Mail,
  MessageCircle,
  X,
  Zap,
} from "lucide-react";
import { FiInstagram } from "react-icons/fi";
import logo from "./assets/Logo.jpg";
import { clubs, fleet, services } from "./data/siteData";
import { FleetPage } from "./components/FleetPage";
import "./App.css";

const whatsappNumber = "5511915569038";
const whatsappLink = `https://wa.me/${whatsappNumber}`;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showFleetPage, setShowFleetPage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  
  const goToWhatsapp = (
    message = "Olá! Gostaria de solicitar um orçamento para transporte.",
  ) => {
    window.open(
      `${whatsappLink}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Olá, Ação Esportes! Gostaria de solicitar um orçamento.%0A%0ANome: ${data.get("name")}%0AEmpresa: ${data.get("company")}%0ATelefone: ${data.get("phone")}%0AOrigem: ${data.get("origin")}%0ADestino: ${data.get("destination")}%0AData: ${data.get("date")}%0APassageiros: ${data.get("passengers")}%0A%0AMensagem: ${data.get("message")}`;
    setSent(true);
    goToWhatsapp(message);
  };

  const openFleetPage = () => {
    setShowFleetPage(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeFleetPage = () => {
    setShowFleetPage(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const headerClass = showFleetPage || scrolled ? "header header-scrolled" : "header";

  if (showFleetPage) {
    return (
      <div className="site-shell">
        <header className={headerClass}>
          <a className="brand" href="#inicio" onClick={(event) => {
            event.preventDefault();
            closeFleetPage();
          }}>
            <img className="brand-logo" src={logo} alt="Ação Esportes" />
            <span>
              AÇÃO <b>ESPORTES</b>
            </span>
          </a>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={menuOpen ? "nav open" : "nav"}>
            {["Sobre", "Serviços", "Frota", "Eventos", "Contato"].map((item) => {
              const isFleetItem = item === "Frota";

              return (
                <a
                  key={item}
                  href={isFleetItem ? "#frota" : `#${item.toLowerCase()}`}
                  onClick={(event) => {
                    setMenuOpen(false);

                    if (isFleetItem) {
                      event.preventDefault();
                      openFleetPage();
                    }
                  }}
                >
                  {item}
                </a>
              );
            })}
            <button
              className="button button-small"
              onClick={() => goToWhatsapp()}
            >
              Solicitar orçamento <ArrowUpRight size={16} />
            </button>
          </nav>
        </header>

        <main>
          <FleetPage
            onBack={closeFleetPage}
            onQuote={() => {
              closeFleetPage();
              goToWhatsapp();
            }}
          />
        </main>

        <footer className="footer">
          <div className="footer-brand-block">
            <a className="brand footer-brand" href="#inicio" onClick={(event) => {
              event.preventDefault();
              closeFleetPage();
            }}>
              <img className="brand-logo" src={logo} alt="Ação Esportes" />
              <span>
                AÇÃO <b>ESPORTES</b>
              </span>
            </a>

            <p className="footer-copy">
              Transporte profissional para futebol,
              <br />
              eventos e grandes operações.
            </p>
          </div>

          <div className="footer-column">
            <h4>Navegação</h4>
            <ul className="footer-list">
              <li>
                <a href="#inicio" onClick={(event) => { event.preventDefault(); closeFleetPage(); }}>Início</a>
              </li>
              <li>
                <a href="#sobre" onClick={(event) => { event.preventDefault(); closeFleetPage(); }}>Sobre</a>
              </li>
              <li>
                <a href="#servicos" onClick={(event) => { event.preventDefault(); closeFleetPage(); }}>Serviços</a>
              </li>
              <li>
                <a href="#frota" onClick={(event) => { event.preventDefault(); openFleetPage(); }}>Frota</a>
              </li>
              <li>
                <a href="#contato" onClick={(event) => { event.preventDefault(); closeFleetPage(); }}>Contato</a>
              </li>
            </ul>
          </div>

          <div className="footer-column footer-contact">
            <h4>Contato</h4>
            <a href="tel:+5511999999999">(11) 99942-9897</a>
            <a href="mailto:contato@acaoesportes.com.br">acaoesportes@contato.com.br</a>

            <div className="footer-socials" aria-label="Redes sociais">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FiInstagram size={18} />
              </a>
              <a href="mailto:contato2@acaoesportes.com.br" target="_blank" rel="noreferrer" aria-label="E-mail">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <small>© 2026 Ação Esportes. Todos os direitos reservados.</small>
            <a
              className="developer-credit"
              href="https://brunomarianodev.com.br"
              target="_blank"
              rel="noreferrer"
            >
              Desenvolvido por Bruno Mariano
            </a>
          </div>
        </footer>

        <button
          className="whatsapp-float"
          onClick={() => goToWhatsapp()}
          aria-label="Falar no WhatsApp"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="site-shell">
      <header className={headerClass}>
        <a className="brand" href="#inicio">
          <img className="brand-logo" src={logo} alt="Ação Esportes" />
          <span>
            AÇÃO <b>ESPORTES</b>
          </span>
        </a>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "nav open" : "nav"}>
          {["Sobre", "Serviços", "Frota", "Eventos", "Contato"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button
            className="button button-small"
            onClick={() => goToWhatsapp()}
          >
            Solicitar orçamento <ArrowUpRight size={16} />
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <p className="eyebrow">
              <span></span> Transporte que faz parte do jogo
            </p>

            <h1>
              O próximo destino
              <br />
              <i>começa aqui.</i>
            </h1>

            <p className="hero-copy">
              Soluções em transporte para clubes, equipes, eventos esportivos,
              empresas e grandes operações.
            </p>

            <div className="hero-actions">
              <button className="button" onClick={() => goToWhatsapp()}>
                Solicitar orçamento <ArrowUpRight size={18} />
              </button>
              <a className="text-link" href="#servicos">
                <CirclePlay size={18} /> Conheça nossos serviços
              </a>
            </div>

            <div className="hero-proof">
              <span>
                <Check size={15} /> Atendimento personalizado
              </span>
              <span>
                <Check size={15} /> Operação profissional
              </span>
              <span>
                <Check size={15} /> Frota executiva
              </span>
            </div>
          </div>

          <div className="hero-side">
            <span className="hero-number">
              01 <small>/ 04</small>
            </span>
            <span className="vertical-label">AÇÃO EM MOVIMENTO</span>
          </div>

          <div className="scroll-cue">
            scroll <ChevronDown size={15} />
          </div>
        </section>

        <section className="intro section" id="sobre">
          <div className="section-kicker">01 / Sobre nós</div>

          <div className="intro-grid">
            <div>
              <h2>
                Mais que transporte.
                <br />
                <em>Uma operação.</em>
              </h2>
            </div>
            <div>
              <p className="lead">
                Por trás de cada grande evento existe uma logística que não pode
                parar.
              </p>

              <p>
                A Ação Esportes atua na organização e operação de transporte
                para clubes, equipes, eventos esportivos, empresas e diferentes
                tipos de eventos. Nosso compromisso é oferecer uma experiência
                organizada, confortável e alinhada às necessidades de cada
                operação.
              </p>
              <a className="arrow-link" href="#contato">
                Conheça a Ação Esportes <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div className="stats">
            <div>
              <strong>01</strong>
              <span>
                atendimento
                <br />
                personalizado
              </span>
            </div>
            <div>
              <strong>02</strong>
              <span>
                organização
                <br />
                logística
              </span>
            </div>
            <div>
              <strong>03</strong>
              <span>
                conforto em
                <br />
                cada viagem
              </span>
            </div>
            <div>
              <strong>04</strong>
              <span>
                experiência
                <br />
                profissional
              </span>
            </div>
          </div>
        </section>

        <section className="dark-section section" id="servicos">
          <div className="section-kicker light">02 / Nossas soluções</div>

          <div className="section-heading">
            <h2>
              Transporte para
              <br />
              <em>cada momento.</em>
            </h2>
            <p>
              Do planejamento ao destino, cuidamos de cada detalhe para a sua
              operação acontecer.
            </p>
          </div>

          <div className="service-grid">
            {services.map(({ title, description, icon: Icon }, index) => (
              <article className="service-card" key={title}>
                <span className="card-index">0{index + 1}</span>
                <div className="icon-box">
                  <Icon size={25} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <a href="#contato" aria-label={`Saiba mais sobre ${title}`}>
                  Saiba mais <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="football section">
          <div className="football-copy">
            <div className="section-kicker">03 / Futebol</div>
            <h2>
              No futebol,
              <br />
              <em>cada detalhe importa.</em>
            </h2>
            <p>
              Por trás de cada partida existe uma grande operação. A Ação
              Esportes oferece soluções para que atletas, comissões,
              profissionais e convidados cheguem com conforto, organização e
              pontualidade.
            </p>
            <button
              className="button button-dark"
              onClick={() => goToWhatsapp()}
            >
              Falar com a equipe <ArrowUpRight size={18} />
            </button>
          </div>
          <div className="football-visual">
            <div className="pitch-lines"></div>
            <span className="football-stamp">
              JOGO
              <br />
              <b>É OPERAÇÃO</b>
            </span>
            <span className="football-caption">
              OPERAÇÕES ESPORTIVAS
              <br />
              <b>EM MOVIMENTO</b>
            </span>
          </div>
        </section>

        <section className="clubs section" aria-labelledby="clubs-title">
          <div className="section-kicker">04 / Nossos clientes</div>
          <div className="clubs-heading">
            <h2 id="clubs-title">
              Quem entra em campo
              <br />
              <em>com a Ação.</em>
            </h2>
            <button
              className="carousel-control"
              onClick={() => setCarouselPaused(!carouselPaused)}
              aria-label={
                carouselPaused ? "Continuar carrossel" : "Pausar carrossel"
              }
            >
              {carouselPaused ? "Continuar" : "Pausar"}{" "}
              <span>{carouselPaused ? "▶" : "Ⅱ"}</span>
            </button>
          </div>
          <div className={carouselPaused ? "club-track paused" : "club-track"}>
            {[...clubs, ...clubs].map((club, index) => (
              <div className="club-item" key={`${club.name}-${index}`}>
                <span className="club-badge">
                  {club.logo ? (
                    <img
                      src={club.logo}
                      alt={`Escudo do ${club.name}`}
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="club-fallback">AE</span>
                  )}
                </span>
                <strong>{club.name}</strong>
              </div>
            ))}
          </div>
          <p className="clubs-note">
            Clubes e operações que fazem parte da nossa história.{" "}
            <span>Conte para a gente qual é o seu próximo jogo.</span>
          </p>
        </section>

        <section className="fleet section" id="frota">
          <div className="section-kicker">05 / Nossa frota</div>
          <div className="section-heading">
            <h2>
              Uma frota preparada
              <br />
              <em>para cada desafio.</em>
            </h2>
            <p>Veículos e soluções que se adaptam ao ritmo de cada operação.</p>
          </div>
          <div className="fleet-grid">
            {fleet.map((item) => (
              <article className="fleet-card" key={item.name}>
                <div
                  className={`fleet-image ${item.name === "Van executiva" ? "van-image" : ""}`}
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <span>{item.tag}</span>
                </div>
                <div className="fleet-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <button
                    className="arrow-link"
                    onClick={() =>
                      goToWhatsapp(
                        `Olá! Gostaria de um orçamento para ${item.name}.`,
                      )
                    }
                  >
                    Solicitar orçamento <ArrowUpRight size={16} />
                  </button>
                  <button
                    className="button button-small fleet-detail-button"
                    onClick={openFleetPage}
                  >
                    Ver detalhes <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="events section" id="eventos">
          <div className="section-kicker">05 / Onde atuamos</div>
          <div className="events-layout">
            <div>
              <h2>
                Grandes momentos
                <br />
                <em>pedem presença.</em>
              </h2>
              <p className="lead">
                A operação certa faz o evento acontecer antes mesmo de começar.
              </p>
            </div>
            <div className="event-list">
              {[
                "Eventos esportivos",
                "Jogos de futebol",
                "Eventos corporativos",
                "Congressos e feiras",
                "Shows e excursões",
                "Transfers e viagens",
              ].map((event, i) => (
                <div className="event-row" key={event}>
                  <span>0{i + 1}</span>
                  <strong>{event}</strong>
                  <ArrowUpRight size={18} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="process dark-section section">
          <div className="section-kicker light">06 / Como funciona</div>
          <div className="section-heading">
            <h2>
              Do planejamento
              <br />
              <em>ao destino.</em>
            </h2>
          </div>
          <div className="process-grid">
            {[
              [
                "01",
                "Solicite seu orçamento",
                "Conte sobre a sua demanda, data, destino e passageiros.",
              ],
              [
                "02",
                "Planejamos a operação",
                "Analisamos o cenário e definimos a melhor solução.",
              ],
              [
                "03",
                "Alinhamos os detalhes",
                "Horários, locais e informações ficam claros para todos.",
              ],
              [
                "04",
                "Sua operação acontece",
                "Acompanhamos tudo para uma experiência organizada.",
              ],
            ].map(([n, title, text]) => (
              <div className="process-item" key={n}>
                <strong>{n}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="contact section" id="contato">
          <div className="contact-intro">
            <div className="section-kicker">07 / Fale conosco</div>
            <h2>
              Vamos planejar sua
              <br />
              <em>próxima operação?</em>
            </h2>
            <p>
              Conte o que você precisa. Nossa equipe prepara uma solução sob
              medida.
            </p>
            <div className="contact-details">
              <a href={whatsappLink} target="_blank">
                <MessageCircle size={18} /> WhatsApp da equipe
              </a>
              <a href="mailto:contato@acaoesportes.com.br">
                <Zap size={18} /> contato@acaoesportes.com.br
              </a>
              <a href="https://instagram.com" target="_blank">
                <CirclePlay size={18} /> @acaoesportes
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={submitForm}>
            <div className="form-row">
              <label>
                Seu nome
                <input
                  required
                  name="name"
                  placeholder="Como podemos chamar você?"
                />
              </label>
              <label>
                Empresa
                <input name="company" placeholder="Nome da empresa" />
              </label>
            </div>
            <div className="form-row">
              <label>
                Telefone
                <input required name="phone" placeholder="(00) 00000-0000" />
              </label>
              <label>
                Data do evento
                <input name="date" type="date" />
              </label>
            </div>
            <div className="form-row">
              <label>
                Origem
                <input name="origin" placeholder="De onde partimos?" />
              </label>
              <label>
                Destino
                <input
                  required
                  name="destination"
                  placeholder="Para onde vamos?"
                />
              </label>
            </div>
            <label>
              Quantidade de passageiros
              <input name="passengers" placeholder="Informe uma estimativa" />
            </label>
            <label>
              Conte mais sobre sua operação
              <textarea
                name="message"
                rows={3}
                placeholder="Tipo de serviço, horários e outras informações"
              ></textarea>
            </label>
            <button className="button" type="submit">
              {sent ? "Solicitação enviada" : "Enviar solicitação"}{" "}
              <ArrowUpRight size={18} />
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand-block">
          <a className="brand footer-brand" href="#inicio">
            <img className="brand-logo" src={logo} alt="Ação Esportes" />
            <span>
              AÇÃO <b>ESPORTES</b>
            </span>
          </a>

          <p className="footer-copy">
            Transporte profissional para futebol,
            <br />
            eventos e grandes operações.
          </p>
        </div>

        <div className="footer-column">
          <h4>Navegação</h4>
          <ul className="footer-list">
            <li>
              <a href="#inicio">Início</a>
            </li>
            <li>
              <a href="#sobre">Sobre</a>
            </li>
            <li>
              <a href="#servicos">Serviços</a>
            </li>
            <li>
              <a href="#frota">Frota</a>
            </li>
            <li>
              <a href="#contato">Contato</a>
            </li>
          </ul>
        </div>

        <div className="footer-column footer-contact">
          <h4>Contato</h4>
          <a href="tel:+5511915569038">(11) 91556-9038</a>
          <a href="mailto:contato@acaoesportes.com.br">
            acaoesportes@contato.com.br
          </a>

          <div className="footer-socials" aria-label="Redes sociais">

            <a href="https://instagram.com/acaoesportes_oficial" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FiInstagram size={18} />
            </a>

            <a href="mailto:contato2@acaoesportes.com.br" target="_blank" rel="noreferrer" aria-label="E-mail">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <small>© 2026 Ação Esportes. Todos os direitos reservados.</small>
          <a
            className="developer-credit"
            href="https://brunomarianodev.com.br"
            target="_blank"
            rel="noreferrer"
          >
            Desenvolvido por Bruno Mariano
          </a>
        </div>
      </footer>
      <button
        className="whatsapp-float"
        onClick={() => goToWhatsapp()}
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}

export default App;
