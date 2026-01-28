"use strict";

// <------ELEMENTS ----->
const modals = document.querySelectorAll(".modal");
const modalNewItem = document.querySelector(".modal-new-item");
const modalEditItem = document.querySelector(".modal-edit-item");
const modalNewFriend = document.querySelector(".modal-new-friend");
const modalEditFriend = document.querySelector(".modal-edit-friend");
const overlay = document.querySelector(".overlay");
const groceryItemName = document.querySelector(".grocery-item__name");
const groceryItemPrice = document.querySelector(".grocery-item__price");
const containerGroceryList = document.querySelector(".grocery__list");
const summaryTotal = document.querySelector(".summary__total");
const summaryDetails = document.querySelector(".summary__details");
const summaryContainer = document.querySelector(".summary");
const groceryItemQuantityModal = document.querySelector(
  ".controls-input__value-modal"
);
const groceryItemAmountModal = document.querySelector(
  ".grocery-item__amount-modal"
);
const groceryEditItemQuantityModal = document.querySelector(
  ".controls-input-edit__value-modal"
);
const avatarContainer = document.querySelector(".avatar-container");
const editAvatarContainer = document.querySelector(".edit-avatar-container");
const avatarListImg = document.querySelectorAll(".friend-list-avatar");
const appGreeting = document.querySelector(".header__greeting");
const userHeaderContainer = document.querySelector(".header__user");
const blankStateCard = document.querySelector(".grocery__blank-state");
const containerGroceryInfo = document.querySelector(".grocery-item__info");

// inputs
const inputItemName = document.querySelector("#item-name");
const inputItemPrice = document.querySelector("#item-price");
const inputFriendName = document.querySelector("#friend-name");
const inputEditFriendName = document.querySelector("#edit-friend-name");

const inputEditItemName = document.querySelector("#edit-item-name");
const inputEditItemPrice = document.querySelector("#edit-item-price");

// buttons
const btnNewItem = document.querySelectorAll(".grocery__add-btn");
const blankStateAddBtn = document.querySelector(
  ".grocery__blank-state-add-btn"
);
const btnFloat = document.querySelector(".btn-float");
const btnCloseModal = document.querySelectorAll(".modal__close-btn");
const btnQuantityControlModal = document.querySelectorAll(
  ".controls-input__button-modal"
);
const btnModalSubmit = document.querySelector(".modal__submit-button");
const btnEditModalSubmit = document.querySelector(".modal__submit-edit-button");
const btnModalSubmitFriend = document.querySelector(".modal__submit-friend");
const btnModalSubmitEditFriend = document.querySelector(
  ".modal__submit-edit-friend"
);
const btnDeleteFriend = document.querySelector(".modal__delete-friend");
const btnAddFriend = document.querySelector(".header__friend-btn");

class Item {
  constructor(itemName, itemQuantity, itemPrice, itemId) {
    this.itemName = itemName;
    this.itemQuantity = itemQuantity;
    this.itemPrice = itemPrice;
    this.itemId = itemId;
    this.calcTotalAmount();
  }

  calcTotalAmount() {
    this.itemTotal = this.itemPrice * this.itemQuantity;
    return this.itemTotal;
  }

  updateQuantity(newValue) {
    this.itemQuantity = newValue;
  }
}

class User {
  constructor(userName, userAvatar, list = [], friendList = []) {
    this.locale = "pt-BR";
    this.currency = "BRL";
    this.userName = userName;
    this.userAvatar = userAvatar;
    this.friends = friendList;
    this.userGroceryList = list;
    this.totalItem;
    this.totalItemValue;
    this.updateGroceryListTotalItems();
  }

  //create new friend object and push to user's friend list
  addNewFriend(friendName, friendAvatar, friendId) {
    this.friends.push({
      friendName: friendName,
      friendAvatar: friendAvatar,
      friendId: friendId,
    });
  }

  updateGroceryListTotalItems() {
    if (!this.userGroceryList) return;
    this.totalItem = 0;
    this.userGroceryList.forEach((item) => {
      this.totalItem += item.itemQuantity;
    });
  }

  getTotalItemValue() {
    this.totalItemValue = 0;
    this.userGroceryList.forEach((value) => {
      this.totalItemValue += value.calcTotalAmount();
    });
  }
}

const rice = new Item("rice", 1, 2);
const milk = new Item("milk", 3, 4);
const andre = new User("André Nascimento", "avatar-1");
//const andre = new User("André Nascimento", "avatar-1", [rice, milk]);

class App {
  #user = andre;
  #friendSelectedAvatar = "";
  #itemQuantity = 1;
  #selectedItemId = 0;
  #selectedFriendId = 0;
  #friendImages;
  #avatars = [
    "avatar-1",
    "avatar-2",
    "avatar-3",
    "avatar-4",
    "avatar-5",
    "avatar-6",
    "avatar-7",
    "avatar-8",
    "avatar-9",
    "avatar-10",
  ];

  constructor() {
    this.user = this.#user;
    this._getLocalStorage();
    this._displayGreetingMessage();
    this._displayGroceryList();
    this._generateFriendImages();
    //this._displayAvatars();
    this._updateSummary();
    this._updateSubmitItemBtn();

    btnModalSubmitFriend.addEventListener(
      "click",
      this._submitNewFriend.bind(this)
    );
    btnModalSubmitEditFriend.addEventListener(
      "click",
      this._submitEditedFriend.bind(this)
    );
    btnAddFriend.addEventListener("click", this._showAddFriendModal.bind(this));
    btnDeleteFriend.addEventListener("click", this._deleteFriend.bind(this));
    inputFriendName.addEventListener(
      "input",
      this._validateFriendForm.bind(this)
    );

    btnModalSubmit.addEventListener("click", this._submitNewItem.bind(this));
    btnEditModalSubmit.addEventListener(
      "click",
      this._submitEditedItem.bind(this)
    );

    userHeaderContainer.addEventListener(
      "click",
      this._handleHeaderClick.bind(this)
    );

    containerGroceryList.addEventListener(
      "click",
      this._handleListClick.bind(this)
    );
    // might change this when add input validation
    inputItemPrice.addEventListener(
      "input",
      this._updateSubmitItemBtn.bind(this)
    );
  }

  init() {
    btnNewItem.forEach((btn) =>
      btn.addEventListener("click", this._showItemModal.bind(this))
    );

    btnCloseModal.forEach((btn) =>
      btn.addEventListener("click", this._closeModal.bind(this))
    );

    btnQuantityControlModal.forEach((btn) =>
      btn.addEventListener(
        "click",
        this._modalItemQuantityController.bind(this)
      )
    );
    avatarListImg.forEach((img) =>
      img.addEventListener("click", this._selectAvatar.bind(this))
    );
  }

  _showEditItemModal(e) {
    modalEditItem.classList.remove("hidden");
    this._toggleOverlay();
    this._editItem(e);
  }
  _editItem(e) {
    // fulfill inputs with item values
    const itemIndex = Number(e.target.closest(".grocery-item").dataset.index);
    const selectedItem = this.user.userGroceryList[itemIndex];
    this.#selectedItemId = selectedItem.itemId;

    inputEditItemName.value = selectedItem.itemName;
    inputEditItemPrice.value = selectedItem.itemPrice;
    this.#itemQuantity = selectedItem.itemQuantity;
    groceryEditItemQuantityModal.textContent = this.#itemQuantity;
    console.log(selectedItem);
  }

  _showItemModal() {
    modalNewItem.classList.remove("hidden");
    this._toggleOverlay();
  }

  _closeModal(e) {
    e.target.closest(".modal").classList.add("hidden");
    this._toggleOverlay();
    this._clearInputs();
  }

  _toggleOverlay() {
    overlay.classList.toggle("hidden");
  }

  // ----> Add friend <------ //

  _showAddFriendModal() {
    modalNewFriend.classList.remove("hidden");
    this._toggleOverlay();

    this.#friendImages.forEach((img) => {
      avatarContainer.insertAdjacentElement("beforeend", img);
      img.addEventListener("click", this._selectAvatar.bind(this));
    });
  }

  _showEditFriendModal() {
    modalEditFriend.classList.remove("hidden");
    this._toggleOverlay();

    this.#friendImages.forEach((img) => {
      editAvatarContainer.insertAdjacentElement("beforeend", img);
      img.addEventListener("click", this._selectAvatar.bind(this));
    });
    console.log(this.user.friends);
  }

  _editFriend() {
    const selectFriend = this.user.friends.find(
      (friend) => friend.friendId === this.#selectedFriendId
    );

    inputEditFriendName.value = selectFriend.friendName;
    this.#friendSelectedAvatar = selectFriend.friendAvatar;
    // get the friends avatar and set to active
    this.#friendImages
      .find((img) => img.dataset.type === selectFriend.friendAvatar)
      .classList.add("avatar-active");
  }

  _generateFriendImages() {
    // add the avatars on the new friend modal
    this.#friendImages = this.#avatars.map((avatar, index) => {
      const img = document.createElement("img");
      img.src = `assets/img/avatars/${avatar}.png`;
      img.alt = `Avatar Image ${index}`;
      img.className = "avatar friend-list-avatar";
      img.dataset.type = `${avatar}`;

      return img;
    });
  }

  _selectAvatar(e) {
    this.#friendImages.forEach((img) => img.classList.remove("avatar-active"));

    e.target.classList.add("avatar-active");
    this.#friendSelectedAvatar = `${e.target.dataset.type}`;
    console.log(this.#friendSelectedAvatar);
    this._validateFriendForm();
  }

  _submitEditedFriend() {
    this.user.friends.map((friend) => {
      if (friend.friendId === this.#selectedFriendId) {
        friend.friendName = inputEditFriendName.value;
        friend.friendAvatar = this.#friendSelectedAvatar;
      }
    });

    // update summary
    this._updateSummary();
    // save data
    this._setLocalStorage();
    console.log(this.user.friends);
  }

  _deleteFriend(e) {
    //e.preventDefault();
    const selectedFriendIndex = this.user.friends.findIndex(
      (friend) => friend.friendId === this.#selectedFriendId
    );
    if (selectedFriendIndex === -1) return;

    this.user.friends.splice(selectedFriendIndex, 1);
    // this.user.userGroceryList.splice(itemIndex, 1);

    this._displayGreetingMessage();
    // update summary
    this._updateSummary();
    // save data
    this._setLocalStorage();
  }

  _submitNewFriend(e) {
    // e.preventDefault();

    this.user.addNewFriend(
      inputFriendName.value,
      this.#friendSelectedAvatar,
      Number(Date.now())
    );

    this._displayGreetingMessage();
    // update summary
    this._updateSummary();
    this._closeModal(e);
    // save data
    this._setLocalStorage();
  }

  _validateFriendForm() {
    if (inputFriendName.value !== "" && this.#friendSelectedAvatar !== "")
      btnModalSubmitFriend.disabled = false;
    // maybe refactor form validation
  }

  // ----> Add item <------ //

  _submitEditedItem() {
    this.user.userGroceryList.map((e) => {
      // search for the element with the selected Id
      if (e.itemId === this.#selectedItemId) {
        console.log(e.itemName);
        e.itemName = inputEditItemName.value;
        e.itemPrice = inputEditItemPrice.value;
        e.itemQuantity = groceryEditItemQuantityModal.textContent;
      }
    });

    // update item total
    this.user.updateGroceryListTotalItems();
    // re-render list
    this._displayGroceryList();
    //update summary
    this._updateSummary();
    // saves on local storage
    this._setLocalStorage();

    // do the logic to increase and decrease
  }

  _submitNewItem(e) {
    e.preventDefault();
    const itemName = inputItemName.value;
    const itemPrice = Number(inputItemPrice.value);
    const itemId = Number(Date.now());
    const newItem = new Item(itemName, this.#itemQuantity, itemPrice, itemId);

    // add the new item to the grocery list obj:
    this.user.userGroceryList.push(newItem);
    // display the list
    this._displayGroceryList();
    // update item total
    this.user.updateGroceryListTotalItems();
    //update summary
    this._updateSummary();

    this._setLocalStorage();
  }

  _modalItemQuantityController(e) {
    e.preventDefault();
    if (e.target.dataset.type === "increase") this.#itemQuantity++;
    if (e.target.dataset.type === "decrease" && this.#itemQuantity > 1)
      this.#itemQuantity--;

    groceryItemQuantityModal.innerHTML =
      groceryEditItemQuantityModal.innerHTML = this.#itemQuantity;

    //update btn label
    this._updateSubmitItemBtn();
  }

  _renderListItems(item, index) {
    let checkItemQt = item.itemQuantity <= 1;
    //prettier-ignore
    let html = `
      <li class="grocery-item" data-index="${index}">
        <div class="grocery-item__info">
          <h3 class="grocery-item__name">${item.itemName}</h3>
          <p class="grocery-item__price">${this._formatCurrency(
            item.itemPrice
          )} / unit <span class="material-icons"> edit </span></p>
        </div>
        <div class="grocery-item__controls">
          <div class="controls-input">
            <button class="controls-input__subtract-button btn-rounded ${checkItemQt? 'hidden' : ''} btn btn-control material-icons" data-type="decrease">remove
            </button>
            <button class="controls-input__delete-button btn-rounded ${checkItemQt? '' : 'hidden'}  btn btn-control material-icons" data-type="delete">delete_outlined
            </button>
            <p class="controls-input__value">
              ${item.itemQuantity}
            </p>
            <button class="controls-input__add-button btn-rounded btn-control btn material-icons" data-type="increase">add</button>
          </div>
          <p class="grocery-item__amount">${this._formatCurrency(
            item.itemTotal
          )} </p>
        </div>
      </li>`;

    return html;
  }

  _displayGroceryList() {
    const groceryList = this.user.userGroceryList;
    if (groceryList.length > 0) {
      //remove blank state page
      blankStateCard.classList.add("hidden");
      summaryContainer.classList.remove("hidden");
      btnFloat.classList.remove("hidden");

      // render grocery items
      containerGroceryList.classList.remove("hidden");
      containerGroceryList.innerHTML = groceryList
        .map((item, index) => this._renderListItems(item, index))
        .join("");
    } else if (groceryList.length <= 0) {
      // hide grocery container and show blank state card
      containerGroceryList.classList.add("hidden");
      blankStateCard.classList.remove("hidden");
      summaryContainer.classList.add("hidden");
      btnFloat.classList.add("hidden");
    }
  }

  _handleListClick(e) {
    if (e.target.closest(".btn-control")) {
      this._quantityItemControl(e);
      return;
    }

    if (e.target.closest(".grocery-item__info")) {
      this._showEditItemModal(e);
    }
  }

  _handleHeaderClick(e) {
    if (
      !e.target.classList.contains("header__avatar") ||
      e.target.dataset.role !== "friend"
    )
      return;

    if ((e.target.dataset.role = "friend")) {
      this._showEditFriendModal();
      this.#selectedFriendId = +e.target.dataset.id;
      this._editFriend();
    }
  }

  _quantityItemControl(e) {
    //select the button
    const btn = e.target.closest(".btn-control");
    if (!btn) return; // returns if the element isn´t the control button

    let value = Number(
      e.target
        .closest(".controls-input")
        .querySelector(".controls-input__value")
        .textContent.trim()
    );

    const itemIndex = Number(e.target.closest(".grocery-item").dataset.index);

    const updateObjectValues = () => {
      // update grocery values
      this.user.userGroceryList[itemIndex].updateQuantity(value);
      this.user.userGroceryList[itemIndex].calcTotalAmount();
    };

    // increase/decrease item quantity
    if (btn.dataset.type === "increase") {
      value++;
      updateObjectValues();
    } else if (btn.dataset.type === "decrease") {
      value--;
      updateObjectValues();
    } else if (btn.dataset.type === "delete") {
      value--;
      this.user.userGroceryList.splice(itemIndex, 1);
    }

    // update list
    this._displayGroceryList();
    // update grocery list total
    this.user.updateGroceryListTotalItems();
    // update summary
    this._updateSummary();
    // save data
    this._setLocalStorage();
  }

  _updateSummary() {
    this.user.getTotalItemValue();
    const totalForEachFriend =
      this.user.totalItemValue / (this.user.friends.length + 1);
    const label = this.user.totalItem === 1 ? "item" : "items";
    const summaryInfo =
      this.user.friends.length > 0
        ? `| ${this._formatCurrency(totalForEachFriend)} for each friend`
        : "";

    summaryTotal.textContent = this._formatCurrency(this.user.totalItemValue);
    summaryDetails.textContent = `${this.user.totalItem} ${label} ${summaryInfo}`;
  }

  _updateSubmitItemBtn() {
    const label = this.#itemQuantity === 1 ? "item" : "items";
    const value = Number(inputItemPrice.value);
    const btnLabel = `Add ${
      this.#itemQuantity
    } ${label} → ${this._formatCurrency(value * this.#itemQuantity)}`;

    if (inputItemPrice.value !== "")
      groceryItemAmountModal.textContent = btnLabel;
  }

  ////////////

  _clearInputs() {
    //friend
    inputFriendName.value = "";
    this.#friendSelectedAvatar = "";
    btnModalSubmitFriend.disabled = true;
    [...avatarContainer.children].forEach((avatar) => {
      avatar.classList.remove("avatar-active");
    });
    // item
    groceryItemQuantityModal.innerHTML = this.#itemQuantity = 1;
    inputItemPrice.value = inputItemName.value = "";

    // edit item
    inputEditItemName.value = inputEditItemPrice.value = "";
    this.#selectedItemId = 0;
  }

  _displayGreetingMessage() {
    const userFriendsList = this.user.friends;
    let friendAvatarImgs = [];
    userHeaderContainer.innerHTML = "";
    if (userFriendsList.length >= 1) {
      // clear the container

      // generate friend images
      userFriendsList.forEach((friend) => {
        const img = `<img class="header__avatar" data-role='friend' data-id='${friend.friendId}' src="assets/img/avatars/${friend.friendAvatar}.png" alt="${friend.friendName}"/>`;
        friendAvatarImgs.push(img);
      });
      // add user avatar + friends
      userHeaderContainer.insertAdjacentHTML(
        "beforeend",
        `<img class="header__avatar" src="assets/img/avatars/${
          this.user.userAvatar
        }.png" alt="${this.user.userName}"/> ${[friendAvatarImgs.join("")]}`
      );
    } else {
      // display the avatar + welcome message
      const userGreeting = `<img class="header__avatar" src="assets/img/avatars/${
        this.user.userAvatar
      }.png" alt="User avatar"/>  <h1 class="header__greeting">Welcome ${
        this.user.userName.split(" ")[0]
      }!</h1>`;
      userHeaderContainer.insertAdjacentHTML("beforeend", userGreeting);
    }
  }

  _formatCurrency(value) {
    return new Intl.NumberFormat(this.user.locale, {
      style: "currency",
      currency: this.user.currency,
    }).format(value);
  }

  // save data on local storage
  _setLocalStorage() {
    localStorage.setItem("user", JSON.stringify(this.user));
  }

  // retrieves data from local storage
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("user"));
    let loadGroceryList = [];
    // creates new item class from data objects
    if (!data) return;
    data.userGroceryList.forEach((e) => {
      const item = new Item(e.itemName, e.itemQuantity, e.itemPrice, e.itemId);
      loadGroceryList.push(item);
    });

    // create new user class
    this.user = new User(
      data.userName,
      data.userAvatar,
      loadGroceryList,
      data.friends
    );

    this._displayGreetingMessage();
    this._displayGroceryList();
    this._updateSummary();
  }
}

const app = new App();
app.init();
