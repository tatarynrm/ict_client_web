import "./CompanyFiles.scss";
import { GrDocumentZip } from "react-icons/gr";
import { FcDocument } from "react-icons/fc";
const links = [
  {
    title: "ДТЕП",
    link: "../../assets/files/DTEP.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Логістик",
    link: "../../assets/files/LOGISTIC.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Фрахт",
    link: "../../assets/files/FRAKHT.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Опитувальний лист",
    link: "../../assets/files/ICT_LIST.doc",
    img: <FcDocument />,
  },
];
const CompanyFiles = () => {
  return (
    <div className="company__files container">
      <h2>Установчі документи</h2>
      <div className="ict__docs">
        {links.map((item, idx) => {
          return (
            <a
              className="document__link-container"
              href={item.link}
              download={true}
            >
              <div className="document__info-container">
                {item.img}

                <span className="document__name">{item.title}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyFiles;
