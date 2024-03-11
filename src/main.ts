import FullList from './model/FullList';
import ListItem from './model/ListItem';
import './style.css';
import ListTemplate from './templates/ListTemplate';

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement;

  itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault();

    //get the new item value
    let input = document.getElementById('newItem') as HTMLButtonElement;
    let newEntryText: string = input.value.trim();
    if (!newEntryText.length) return;

    //calculate item ID
    const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1;

    const newItem = new ListItem(itemId.toString(), newEntryText);

    fullList.addItem(newItem);
    input.value = '';

    template.render(fullList);
  });

  const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement;

  clearItems.addEventListener('click', (): void => {
    fullList.clearList;
    template.clear();
  });

  //load on the first instance

  fullList.load();
  template.render(fullList);
};

document.addEventListener('DOMContentLoaded', initApp);
