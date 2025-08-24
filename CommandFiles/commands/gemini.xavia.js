/*
* @XaviaCMD
* @rapido
**/

import axios from "axios";

const config = {
    name: "gemini",
    version: "2.0.3",
    permissions: [0],
    noPrefix: "both",
    credits: "rapido",
    description: "Interact with Google Gemini 2.0 Flash with Image recognition (From rapido's XaviaBot command) basically just added this CMD by Liane Cagara's CassieahBot for Testing compatibility of ChatBot.",
    category: "Artificial Intelligence",
    usages: "[text] (reply to image)",
    cooldown: 3
};

const style = {
  titleFont: "bold",
  title: "📷 Google Gemini",
  contentFont: "fancy"
};

async function onCall({ message, args, getLang }) {
    const text = args.join(' ');
    if (!text) return message.reply("Please provide a question or reply to photo/image to recognize it with question.");

    try {
        let imageUrl;
        if (message.messageReply?.attachments?.[0]?.type === "photo") {
            imageUrl = message.messageReply.attachments[0].url;
        }

        const api = `https://rapido-api.vercel.app/api/gemini?chat=${encodeURIComponent(text)}&uid=${message.senderID}${imageUrl ? `&imageUrl=${encodeURIComponent(imageUrl)}` : ''}`;
        const res = await axios.get(api);
        
        message.reply(res.data.response);
    } catch (e) {
        message.reply(`An error occurred while fetching data: ${e.message}\nPlease contact admin of bot for assistance.`);
    }
}

export default {
    config,
    onCall,
    style
};
            
