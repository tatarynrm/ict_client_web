import "./ZapEditForm.scss";

const ZapEditForm = () => {
  return (
    <div className="zap__edit-form">
      <form>
        <div className="form__control">
          <textarea type="textarea" rows={"20"} cols="40" />
          <button>Редагувати</button>
        </div>
      </form>
    </div>
  );
};

export default ZapEditForm;
