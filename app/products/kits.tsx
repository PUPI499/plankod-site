import { StoreHeading } from "./ui";

export function Configurator() {
  return (
    <section className="shell store-section" id="configurator">
      <div className="store-config">
        <StoreHeading tag="Подбор компонентов" title="Какие системы есть на объекте?" text="Выберите известный интерфейс и нужные функции. Подборка покажет примеры моделей. Для спецификации инженер проверит питание, схему подключения и условия эксплуатации." />
        <form data-store-config>
          <label>Тип объекта<select name="object">
            <option value="hotel">Гостиница или отель</option>
            <option value="resort">Санаторий или пансионат</option>
            <option value="medical">Медицинское учреждение</option>
            <option value="office">Другой объект организации</option>
          </select></label>
          <fieldset><legend>Что требуется</legend>{["Климат","Освещение","Безопасность"].map((task, i) =>
            <label key={task}><input type="checkbox" name="task" value={task} defaultChecked={i === 0} />{task}</label>
          )}</fieldset>
          <label>Система на объекте<select name="ecosystem">
            <option value="">Требуется обследование</option>
            <option value="wiren-board">Modbus RTU / Wiren Board</option>
            <option value="rubetek">RF 868 МГц / Rubetek</option>
          </select></label>
          <button className="store-primary" type="submit">Посмотреть варианты →</button>
        </form>
        <div data-config-status role="status" />
        <div data-config-results className="store-config-results" />
        <noscript><a href="#contact">Отправить исходные данные специалисту</a></noscript>
      </div>
    </section>
  );
}
