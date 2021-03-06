import { CardsBlock } from './CardsBlock';

export class UserCardsBlock extends CardsBlock {
  constructor(params) {
    super();
    const {
      container, config, renderCardList,
    } = params;
    this._container = container;
    this._config = config;
    this._renderCardList = renderCardList;
    this._markup = `<section class="cards-wrapper cards-wrapper_type_user-cards root__section root__section-margin">
    <h2 class="root__title"></h2>
    <div class="cards-list cards-list_type_user-cards"></div>
    <button class="button cards-wrapper__button hidden">${config.button.text}</button>
  </section>`;
  }

  _setTitle = () => {
    super._setTitle();
    if (this._cardsArr && this._cardsArr.length > 0) {
      this._title.textContent = (this._isCardsOwner)
        ? this._config.title.authorized.regular.create(this._cardsArr.length)
        : this._config.title.unAuthorized.regular.create(this._cardsArr.length, this._cardsOwner.name);
    } else {
      this._title.textContent = (this._isCardsOwner)
        ? this._config.title.authorized.empty
        : this._config.title.unAuthorized.empty.create(this._cardsOwner.name);
    }
  }

  _render = () => {
    this._renderCards();
    this._container.append(this._view);
    this._toggleVisibility();
  }

  update = (params) => {
    if (params) {
      const { removedCard, addedCard } = params;
      if (removedCard) {
        const index = this._cardsArr.indexOf(removedCard);
        this._cardsArr.splice(index, 1);
      }
      if (addedCard) {
        this._cardsArr.push(addedCard);
      }
    }
    this._view.remove();
    this.create({
      authUser: this._authUser,
      cardsOwner: this._cardsOwner,
      cardsArr: this._cardsArr,
    });
  }
}
