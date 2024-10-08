import React, {useState} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage({botCollection, setBotCollection, setCheckBotCollection}) {
  const [botBasket, setBotBasket] = useState([]);

  function addBot (bot) {
    const botInBasket = botBasket.find((item) => item.id === bot.id);
      if (!botInBasket){
        setBotBasket([...botBasket, bot]);
      }
  }

  function removeBot(bot) {
    const botInBasket = botBasket.find((item) => item.id === bot.id);
      if (botInBasket){
        setBotBasket(
          botBasket.filter((filteredBot)=> filteredBot.id !== bot.id)
        );
      }
  }

  function dischargeBot(bot){
    setBotCollection(botCollection.filter((item)=> item.id !== bot.id));
    removeBot(bot)
    fetch (`http://localhost:3000/bots/${bot.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type" : "application/json",
      },
    });
    setCheckBotCollection(true);
  }

  return (
    <div>
      <YourBotArmy botBasket = {botBasket} removeBot = {removeBot} dischargeBot = {dischargeBot} />
      <BotCollection botCollection={botCollection} addBot = {addBot} dischargeBot = {dischargeBot} />
    </div>
  )
}

export default BotsPage;