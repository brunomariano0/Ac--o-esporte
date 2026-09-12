import { useState } from "react";
import onibus from "../assets/Onibus.jpg";
import van from "../assets/van.jpg";
import "./FleetPage.css";

import assentos from "../assets/assentos.jpeg";
import dentro from "../assets/dentro-onibus.jpeg";
import noite from "../assets/onibus-noite.jpeg";
import onibus2 from "../assets/onibus-2.jpeg";

import assentosVan from "../assets/Van-assentos.jpeg";
import foraVan from "../assets/Van-fora.jpeg";

type FleetVehicle = {
  name: string;
  type: string;
  description: string;
  photos: string[];
  highlights: string[];
  specs: { label: string; value: string }[];
};

const vehicles: FleetVehicle[] = [
  {
    name: "Ônibus ",
    type: "Executivo premium",
    description:
      "Estrutura pensada para grupos, comissões técnicas e eventos que exigem conforto, organização e presença profissional em cada deslocamento.",
    photos: [onibus, assentos, dentro, noite, onibus2],
    highlights: ["Conforto premium", "Espaço para grupos", "Atendimento personalizado"],
    specs: [
      { label: "Capacidade", value: "Até 54 Lugares" },
      { label: "Layout", value: "Poltronas altas e espaçadas" },
      { label: "Uso ideal", value: "Clubes, eventos e excursões" },
      { label: "Extras", value: "Banheiro, Ar condicionado, Wi-Fi, Água copo" },
    ],
  },
  {
    name: "Van executiva",
    type: "Van premium",
    description:
      "Mobilidade, praticidade e conforto para deslocamentos esportivos, empresariais e de alto padrão, com atenção aos detalhes da operação.",
    photos: [van, assentosVan,foraVan],
    highlights: ["Movimento ágil", "Ambiente exclusivo", "Flexibilidade para operações"],
    specs: [
      { label: "Capacidade", value: "Até 12, 15 e 18 Lugares" },
      { label: "Layout", value: "Acabamento refinado e interno" },
      { label: "Uso ideal", value: "Transfers e grupos menores" },
      { label: "Extras", value: "Ar condicionado" },
    ],
  },
];

type FleetPageProps = {
  onBack: () => void;
  onQuote: () => void;
};

export function FleetPage({ onBack, onQuote }: FleetPageProps) {
  const [selectedGallery, setSelectedGallery] = useState<{
    vehicleName: string;
    index: number;
  } | null>(null);

  const openGallery = (vehicleName: string, index: number) => {
    setSelectedGallery({ vehicleName, index });
  };

  const closeGallery = () => setSelectedGallery(null);

  const activeVehicle =
    selectedGallery &&
    vehicles.find((vehicle) => vehicle.name === selectedGallery.vehicleName);

  const activeIndex = selectedGallery?.index ?? 0;

  return (
    <div className="fleet-page">
      <header className="fleet-page-header">
        <div className="section-kicker">Nossa frota</div>
        <h1>
          Transporte pensado
          <br />
          para cada operação.
        </h1>
        <p>
          Veículos preparados para clubes, eventos, equipes e deslocamentos que
          exigem segurança, conforto e organização em todos os detalhes.
        </p>

        <div className="fleet-page-actions">
          <button className="button" onClick={onBack}>
            Voltar ao início
          </button>
          <button className="button button-secondary" onClick={onQuote}>
            Solicitar orçamento
          </button>
        </div>
      </header>

      <section className="fleet-page-stats" aria-label="Estatísticas da frota">
        <div className="fleet-stat">
          <strong>+20</strong>
          <span>anos de experiência</span>
        </div>
        <div className="fleet-stat">
          <strong>100%</strong>
          <span>atendimento sob medida</span>
        </div>
        <div className="fleet-stat">
          <strong>24/7</strong>
          <span>suporte operacional</span>
        </div>
      </section>

      <main className="fleet-page-main">
        {vehicles.map((vehicle) => (
          <article className="fleet-vehicle" key={vehicle.name}>
            <div
              className="fleet-vehicle-main-image"
              onClick={() => openGallery(vehicle.name, 0)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openGallery(vehicle.name, 0);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Abrir galeria de ${vehicle.name}`}
            >
              <img src={vehicle.photos[0]} alt={vehicle.name} />
              <div className="fleet-main-image-overlay">
                <span>Ver fotos</span>
              </div>
            </div>

            <div className="fleet-vehicle-content">
              <span className="fleet-type">{vehicle.type}</span>
              <h2>{vehicle.name}</h2>
              <p>{vehicle.description}</p>

              <div className="fleet-specs">
                {vehicle.specs.map((spec) => (
                  <div key={spec.label} className="fleet-spec-item">
                    <span>{spec.label}</span>
                    <strong>{spec.value}</strong>
                  </div>
                ))}
              </div>

              <ul className="fleet-highlights">
                {vehicle.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="fleet-preview-strip">
                {vehicle.photos.slice(1, 4).map((photo, index) => (
                  <button
                    type="button"
                    key={`${vehicle.name}-preview-${index}`}
                    className="fleet-preview-thumb"
                    onClick={() => openGallery(vehicle.name, index + 1)}
                    aria-label={`Abrir imagem ${index + 2} de ${vehicle.name}`}
                  >
                    <img src={photo} alt={`${vehicle.name} - imagem ${index + 2}`} />
                  </button>
                ))}

                {vehicle.photos.length > 4 && (
                  <button
                    type="button"
                    className="fleet-preview-more"
                    onClick={() => openGallery(vehicle.name, 0)}
                  >
                    +{vehicle.photos.length - 4}
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </main>

      {activeVehicle && (
        <div className="fleet-modal-backdrop" onClick={closeGallery}>
          <div
            className="fleet-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Galeria de ${activeVehicle.name}`}
          >
            <button
              type="button"
              className="fleet-modal-close"
              onClick={closeGallery}
              aria-label="Fechar galeria"
            >
              ×
            </button>

            <button
              type="button"
              className="fleet-modal-nav fleet-modal-prev"
              onClick={() =>
                setSelectedGallery({
                  vehicleName: activeVehicle.name,
                  index:
                    (activeIndex - 1 + activeVehicle.photos.length) %
                    activeVehicle.photos.length,
                })
              }
              aria-label="Imagem anterior"
            >
              ‹
            </button>

            <img
              src={activeVehicle.photos[activeIndex]}
              alt={`${activeVehicle.name} - imagem ${activeIndex + 1}`}
              className="fleet-modal-image"
            />

            <button
              type="button"
              className="fleet-modal-nav fleet-modal-next"
              onClick={() =>
                setSelectedGallery({
                  vehicleName: activeVehicle.name,
                  index: (activeIndex + 1) % activeVehicle.photos.length,
                })
              }
              aria-label="Próxima imagem"
            >
              ›
            </button>

            <div className="fleet-modal-caption">
              <span>{activeVehicle.name}</span>
              <strong>
                {activeIndex + 1} / {activeVehicle.photos.length}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
