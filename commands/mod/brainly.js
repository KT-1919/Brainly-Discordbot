const { BrainlyAPI, Server } = require('brainly-api');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "brainly",
    category: "info",
    description: "Brainly",
    run: (client, message, args) => {
        if (!args.length) {
            return message.channel.send("Kirim Soal Di Sini");
          }
            let question = message.content.substring(message.content.indexOf(" ") + 1, message.content.length);
           
            BrainlyAPI.startWorker({ experimental: true, server: Server.ID }, async brainly => {
              const resp = await brainly.findQuestion(question);
              const id = (resp.raw[0].data.questionSearch.edges[0].node.databaseId);
              const url = `https://brainly.co.id/tugas/${id}`;
              const htmlAnswer = resp.raw[0].data.questionSearch.edges[0].node.answers.nodes[0].content;
              const answer = htmlAnswer.replace( /(<([^>]+)>)/ig, '');
              const htmlQ = resp.raw[0].data.questionSearch.edges[0].node.content;
              const q = htmlQ.replace( /(<([^>]+)>)/ig, '');

              let embed = new MessageEmbed()
              .setTitle('**Pertanyaan:**')
              .setDescription(q)
              .setColor("RED")

              let embed1 = new MessageEmbed()
              .setTitle('**Menjawab:**')
              .setDescription(answer)
              .setColor("GREEN")



              message.channel.send(embed);
              
             
              message.channel.send(embed1);
              message.channel.send('**Link:** \n');
              message.channel.send(url);
    
            });
        
    }
}