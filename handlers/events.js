var fs = require('fs');
module.exports = (client) => {
  const load = dirs => {
    const events = fs.readdirSync(`./events/${dirs}/`).filter(d => d.endsWith("js"));
    for (let file of events) {
      let event = require(`../events/${dirs}/${file}`);
      let eventName = file.split('.')[0];
      client.on(eventName, event.bind(null, client));
      console.log('[Eventy]' + ` Załadowano ` + eventName);
    }
  };
  ["client", "guild"].forEach((x) => load(x));
};
