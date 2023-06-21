import "./CompanyFiles.scss";
import { GrDocumentZip } from "react-icons/gr";
import { FcDocument } from "react-icons/fc";
const links = [
  {
    title: "ДТЕП",
    link: "http://192.168.5.180/files/DTEP.rar",
    img: <GrDocumentZip />,
  },
  {
    title: "Логістик",
    link: "http://192.168.5.180/files/LOGISTIC.rar",
    img: <GrDocumentZip />,
  },
  {
    title: "Фрахт",
    link: "http://192.168.5.180/files/FRAKHT.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Опитувальний лист",
    link: "http://192.168.5.180/files/ICT_LIST.doc",
    img: <FcDocument />,
  },
  {
    title: "Заява про ... персональних даних",
    link: "http://192.168.5.180/files/OPD_ZAY.doc",
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
              key={idx}
              className="document__link-container"
              href={item.link}
              download
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
