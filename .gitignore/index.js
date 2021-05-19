const Discord = require('discord.js'),
     client = new Discord.Client({
         fetchAllMembers: true
     }),
     config = require('./confi.json')
     fs = require('fs')

client.login(config.token)
client.commands = new Discord.Collection()

fs.readdir('./commands', (err, files) => {
      if (err) throw err
      files.forEach(file => {
          if (!file.endsWith('.js'))return
          const command = reqire(`./commands/${file}`)
          client.commands.set(command.name,command)
      })
})

client.on('message', message => {
    if (message.type !=='DEFAULT' ||message.author.bot) return
    
    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(comandName.slice(config.prefix.lenght))
    if (!command) return
    command.run(message, args, client)
})
