const { 
  Client, 
  GatewayIntentBits, 
  ActionRowBuilder, 
  StringSelectMenuBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  EmbedBuilder, 
  ModalBuilder, 
  TextInputBuilder, 
  TextInputStyle, 
  PermissionFlagsBits 
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Toate rețetele și produsele
const recipes = {
  "retetaPiesaArma": {
    "otel": 1,
    "plastic": 1,
    "arc": 1,
    "scrap_metal": 2,
    "piese_generate": 2
  },
  "arme": {
    "navy_revolver": { "nume": "Navy Revolver", "blueprint": 1, "parts": 4, "components": ["Teava Rifle", "Corp Pistol"], "image": "https://wiki.rage.mp/images/thumb/7/7a/Navyrevolver.png/300px-Navyrevolver.png" },
    "combat_mg": { "nume": "Combat MG", "blueprint": 1, "parts": 4, "components": ["Teava Rifle", "Corp Rifle", "Butstock"], "image": "https://wiki.rage.mp/images/thumb/8/8c/Combatmg.png/300px-Combatmg.png" },
    "assault_smg": { "nume": "Assault SMG", "blueprint": 1, "parts": 4, "components": ["Teava SMG", "Corp Rifle", "Butstock"], "image": "https://wiki.rage.mp/images/thumb/2/22/Assaultsmg.png/300px-Assaultsmg.png" },
    "sawn_off_shotgun": { "nume": "Sawn Off Shotgun", "blueprint": 1, "parts": 4, "components": ["Teava SMG", "Corp Pistol"], "image": "https://wiki.rage.mp/images/thumb/2/29/Sawnoffshotgun.png/300px-Sawnoffshotgun.png" },
    "heavy_revolver": { "nume": "Heavy Revolver", "blueprint": 1, "parts": 4, "components": ["Teava Rifle", "Corp Pistol"], "image": "https://wiki.rage.mp/images/thumb/8/81/Heavyrevolver.png/300px-Heavyrevolver.png" },
    "mg": { "nume": "MG", "parts": 3, "components": ["Teava Rifle", "Corp Rifle", "Butstock"], "image": "https://wiki.rage.mp/images/thumb/c/c2/Mg.png/300px-Mg.png" },
    "assault_rifle_mk2": { "nume": "Assault Rifle MK2", "parts": 3, "components": ["Teava Rifle", "Corp Rifle", "Butstock"], "image": "https://wiki.rage.mp/images/thumb/4/4c/Assaultriflemk2.png/300px-Assaultriflemk2.png" },
    "pistol": { "nume": "Pistol", "components": ["Corp Pistol", "Teava Pistol"], "image": "https://wiki.rage.mp/images/thumb/3/30/Pistol.png/300px-Pistol.png" },
    "tec_9": { "nume": "Tec-9 / Machine Pistol", "parts": 1, "components": ["Corp Pistol", "Teava SMG"], "image": "https://wiki.rage.mp/images/thumb/3/33/Machinepistol.png/300px-Machinepistol.png" },
    "pistol_mk2": { "nume": "Pistol Mk2", "parts": 1, "components": ["Corp Pistol", "Teava Pistol"], "image": "https://wiki.rage.mp/images/thumb/2/2c/Pistolmk2.png/300px-Pistolmk2.png" },
    "micro_smg": { "nume": "Micro SMG", "parts": 1, "components": ["Corp SMG", "Teava SMG"], "image": "https://wiki.rage.mp/images/thumb/b/bd/Microsmg.png/300px-Microsmg.png" },
    "mini_ak": { "nume": "Mini AK / Compact Rifle", "parts": 1, "components": ["Corp Rifle", "Teava SMG"], "image": "https://wiki.rage.mp/images/thumb/2/23/Compactrifle.png/300px-Compactrifle.png" },
    "vintage_pistol": { "nume": "Vintage Pistol", "parts": 2, "components": ["Corp Pistol", "Teava Pistol"], "image": "https://wiki.rage.mp/images/thumb/0/08/Vintagepistol.png/300px-Vintagepistol.png" },
    "smg_mk2": { "nume": "SMG Mk2", "parts": 1, "components": ["Corp SMG", "Teava SMG"], "image": "https://wiki.rage.mp/images/thumb/8/87/Smgmk2.png/300px-Smgmk2.png" },
    "tommy_gun": { "nume": "Tommy Gun / Gusenberg", "parts": 1, "components": ["Teava Rifle", "Corp Rifle", "Butstock"], "image": "https://wiki.rage.mp/images/thumb/2/28/Gusenberg.png/300px-Gusenberg.png" },
    "double_action_revolver": { "nume": "Double Action Revolver", "parts": 3, "components": ["Corp Pistol", "Teava Pistol"], "gold": 1, "image": "https://wiki.rage.mp/images/thumb/a/a2/Doubleaction.png/300px-Doubleaction.png" }
  },
  "gloante": {
    "marlin_44": { "nume": ".44 Marlin", "batch": 30, "casing": { "Cupru": 2 }, "fill": { "Plumb": 1, "Praf de pușcă": 2 } },
    "m_762": { "nume": "7.62mm", "batch": 30, "casing": { "Cupru": 2 }, "fill": { "Plumb": 2, "Praf de pușcă": 2 } },
    "acp_45": { "nume": ".45 ACP", "batch": 30, "casing": { "Cupru": 1 }, "fill": { "Plumb": 1, "Praf de pușcă": 1 } },
    "pbm_9mm": { "nume": "9mm PBM", "batch": 30, "casing": { "Cupru": 1 }, "fill": { "Plumb": 1, "Praf de pușcă": 1 } },
    "acp_9mm": { "nume": "9mm ACP", "batch": 30, "casing": { "Cupru": 2 }, "fill": { "Plumb": 1, "Praf de pușcă": 1 } },
    "magnum_38": { "nume": ".38 Magnum", "batch": 20, "casing": { "Cupru": 2 }, "fill": { "Plumb": 2, "Praf de pușcă": 3 } },
    "m_765": { "nume": "7.65mm", "batch": 20, "casing": { "Cupru": 2 }, "fill": { "Plumb": 2, "Praf de pușcă": 2 } },
    "dap_50": { "nume": ".50 DAP", "batch": 20, "casing": { "Cupru": 4, "Aur": 1 }, "fill": { "Plumb": 3, "Praf de pușcă": 4, "Diamant": 1 } },
    "buckshot": { "nume": "Buckshot", "batch": 20, "casing": { "Aluminium": 2, "Plastic": 5 }, "fill": { "Plumb": 2, "Praf de pușcă": 2 } }
  }
};

// Stocul setat la 200 pentru fiecare produs de la rulotă
const rulotaStock = {
  "Red Fire": 200,
  "Green Haze": 200,
  "Blue Current": 200,
  "Cocaina": 200,
  "Tigari": 200,
  "Jointuri Marihuana": 200
};

// Funcție pentru Embed-ul de stoc
function createStockEmbed() {
  return new EmbedBuilder()
    .setTitle('🚐 STOC CURENT RULOTĂ & EVIDENȚĂ')
    .setDescription('>>> Stocul disponibil în acest moment la rulotă. Apasă pe butonul de mai jos pentru a înregistra un produs dat unui jucător.')
    .setColor('#27ae60')
    .setThumbnail('https://cdn-icons-png.flaticon.com/512/3067/3067451.png')
    .addFields(
      { name: '🔴 Red Fire', value: `\` ${rulotaStock["Red Fire"]} buc \``, inline: true },
      { name: '🟢 Green Haze', value: `\` ${rulotaStock["Green Haze"]} buc \``, inline: true },
      { name: '🔵 Blue Current', value: `\` ${rulotaStock["Blue Current"]} buc \``, inline: true },
      { name: '❄️ Cocaina', value: `\` ${rulotaStock["Cocaina"]} buc \``, inline: true },
      { name: '🚬 Tigari', value: `\` ${rulotaStock["Tigari"]} buc \``, inline: true },
      { name: '🌿 Jointuri Marihuana', value: `\` ${rulotaStock["Jointuri Marihuana"]} buc \``, inline: true }
    )
    .setTimestamp()
    .setFooter({ text: 'Sistem de Gestiune Rulotă • Actualizat în timp real' });
}

let stockMessageId = null;
let stockChannelId = null;

client.once('clientReady', (c) => {
  console.log(`Botul de crafting este ONLINE ca ${c.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // 1. Setup Arme
  if (message.content === '!setup-crafting') {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply({ content: '❌ Nu ai permisiunea!', ephemeral: true });
    const embed = new EmbedBuilder().setTitle('⚔️ CENTRUL DE CRAFTING - ARME').setColor('#2b2d31');
    const options = [{ label: 'Piese de Armă', value: 'craft_piese', emoji: '⚙️' }];
    for (const [key, arma] of Object.entries(recipes.arme)) options.push({ label: arma.nume.substring(0, 100), value: key, emoji: '🔫' });
    const menu = new StringSelectMenuBuilder().setCustomId('crafting_menu_arme').setPlaceholder('🔍 Selectează o armă...').addOptions(options);
    await message.channel.send({ embeds: [embed], components: [new ActionRowBuilder().addComponents(menu)] });
    if (message.deletable) message.delete();
  }

  // 2. Setup Gloanțe
  if (message.content === '!setup-gloante') {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply({ content: '❌ Nu ai permisiunea!', ephemeral: true });
    const embedGloante = new EmbedBuilder().setTitle('📦 FABRICA DE MUNIȚIE').setColor('#d35400');
    const optionsGloante = [];
    for (const [key, glont] of Object.entries(recipes.gloante)) optionsGloante.push({ label: glont.nume.substring(0, 100), value: key, emoji: '🟡' });
    const menuGloante = new StringSelectMenuBuilder().setCustomId('crafting_menu_gloante').setPlaceholder('🔍 Selectează muniția...').addOptions(optionsGloante);
    await message.channel.send({ embeds: [embedGloante], components: [new ActionRowBuilder().addComponents(menuGloante)] });
    if (message.deletable) message.delete();
  }

  // 3. Setup Rulotă
  if (message.content === '!setup-rulota') {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply({ content: '❌ Nu ai permisiunea!', ephemeral: true });

    const button = new ButtonBuilder()
      .setCustomId('open_rulota_modal')
      .setLabel('Dă Item / Modifică Stoc')
      .setStyle(ButtonStyle.Success)
      .setEmoji('📝');

    const sentMsg = await message.channel.send({ 
      embeds: [createStockEmbed()], 
      components: [new ActionRowBuilder().addComponents(button)] 
    });

    stockMessageId = sentMsg.id;
    stockChannelId = sentMsg.channel.id;

    if (message.deletable) message.delete();
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton() && interaction.customId === 'open_rulota_modal') {
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('select_produs_rulota')
      .setPlaceholder('Alege produsul administrat...')
      .addOptions(
        { label: 'Red Fire', value: 'Red Fire', emoji: '🔴' },
        { label: 'Green Haze', value: 'Green Haze', emoji: '🟢' },
        { label: 'Blue Current', value: 'Blue Current', emoji: '🔵' },
        { label: 'Cocaina', value: 'Cocaina', emoji: '❄️' },
        { label: 'Tigari', value: 'Tigari', emoji: '🚬' },
        { label: 'Jointuri Marihuana', value: 'Jointuri Marihuana', emoji: '🌿' }
      );

    return interaction.reply({
      content: '🚐 **Pasul 1:** Selectează produsul pe care dorești să îl scazi din stoc:',
      components: [new ActionRowBuilder().addComponents(selectMenu)],
      ephemeral: true
    });
  }

  if (interaction.isStringSelectMenu() && interaction.customId === 'select_produs_rulota') {
    const produsAles = interaction.values[0];

    const modal = new ModalBuilder()
      .setCustomId(`modal_rulota_${produsAles}`)
      .setTitle(`Evidență: ${produsAles}`);

    const cantitateInput = new TextInputBuilder()
      .setCustomId('input_cantitate')
      .setLabel('Cantitatea dată (scade din stoc)')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('Ex: 10')
      .setRequired(true);

    const idJucatorInput = new TextInputBuilder()
      .setCustomId('input_id_jucator')
      .setLabel('ID-ul Jucătorului')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('Ex: 142')
      .setRequired(true);

    modal.addComponents(
      new ActionRowBuilder().addComponents(cantitateInput),
      new ActionRowBuilder().addComponents(idJucatorInput)
    );

    return interaction.showModal(modal);
  }

  if (interaction.isModalSubmit() && interaction.customId.startsWith('modal_rulota_')) {
    const produs = interaction.customId.replace('modal_rulota_', '');
    const cantitate = parseInt(interaction.fields.getTextInputValue('input_cantitate')) || 0;
    const idJucator = interaction.fields.getTextInputValue('input_id_jucator');
    const dealer = interaction.user;

    // Verificăm dacă cantitatea cerută este mai mare decât stocul actual
    if (cantitate > rulotaStock[produs]) {
      return interaction.reply({
        content: `❌ **Eroare:** Nu mai este stock suficient pentru **${produs}**!\n- Stoc curent disponibil: \`${rulotaStock[produs]} buc\`\n- Cantitatea cerută: \`${cantitate} buc\``,
        ephemeral: true
      });
    }

    // Scadem din stoc
    rulotaStock[produs] -= cantitate;

    // Actualizăm mesajul principal cu stocul nou live
    if (stockMessageId && stockChannelId) {
      try {
        const channel = await client.channels.fetch(stockChannelId);
        const msg = await channel.messages.fetch(stockMessageId);
        const button = new ButtonBuilder()
          .setCustomId('open_rulota_modal')
          .setLabel('Dă Item / Modifică Stoc')
          .setStyle(ButtonStyle.Success)
          .setEmoji('📝');

        await msg.edit({ 
          embeds: [createStockEmbed()], 
          components: [new ActionRowBuilder().addComponents(button)] 
        });
      } catch (err) {
        console.log("Nu s-a putut actualiza mesajul de stoc live:", err);
      }
    }

    const embedLog = new EmbedBuilder()
      .setTitle('🚐 EVIDENȚĂ RULOTĂ - ITEM DAT')
      .setColor('#e67e22')
      .addFields(
        { name: '📦 Produs', value: `\` ${produs} \``, inline: true },
        { name: '📊 Cantitate Dată', value: `\` ${cantitate} buc \``, inline: true },
        { name: '👤 ID Jucător', value: `\` #${idJucator} \``, inline: true },
        { name: '📉 Stoc Rămas', value: `\` ${rulotaStock[produs]} buc \``, inline: true },
        { name: '🛡️ Gestionat de', value: `${dealer}`, inline: false }
      )
      .setTimestamp();

    await interaction.reply({ content: `✅ Tranzacție înregistrată cu succes! Stocul a fost actualizat.`, ephemeral: true });
    await interaction.channel.send({ embeds: [embedLog] });
  }

  // --- ARME ---
  if (interaction.isStringSelectMenu() && interaction.customId === 'crafting_menu_arme') {
    const selected = interaction.values[0];
    if (selected === 'craft_piese') {
      const p = recipes.retetaPiesaArma;
      const embedPiese = new EmbedBuilder()
        .setTitle('⚙️ REȚETĂ: FABRICARE PIESE ARMĂ')
        .setColor('#2980b9')
        .addFields(
          { name: '🧱 Oțel', value: `\` ${p.otel}x \``, inline: true },
          { name: '🧪 Plastic', value: `\` ${p.plastic}x \``, inline: true },
          { name: '🌀 Arc', value: `\` ${p.arc}x \``, inline: true },
          { name: '⛓️ Scrap Metal', value: `\` ${p.scrap_metal}x \``, inline: true },
          { name: '📦 Rezultat', value: `> 🎉 **+${p.piese_generate} Piese**`, inline: false }
        );
      return interaction.reply({ embeds: [embedPiese], ephemeral: true });
    }

    const arma = recipes.arme[selected];
    if (arma) {
      const embedArma = new EmbedBuilder().setTitle(`🔫 ${arma.nume.toUpperCase()}`).setColor('#c0392b');
      if (arma.image) embedArma.setThumbnail(arma.image);

      let text = '';
      if (arma.parts) text += `• Piese: \` ${arma.parts}x \`\n`;
      if (arma.blueprint) text += `• Blueprint: \` ${arma.blueprint}x \`\n`;
      if (arma.gold) text += `• Aur: \` ${arma.gold}x \`\n`;
      if (text) embedArma.addFields({ name: '🛠️ Resurse Bază', value: text, inline: false });

      if (arma.components) {
        embedArma.addFields({ name: '🧩 Componente', value: arma.components.map(c => `> ▫️ ${c}`).join('\n'), inline: false });
      }
      return interaction.reply({ embeds: [embedArma], ephemeral: true });
    }
  }

  // --- GLOANȚE ---
  if (interaction.isStringSelectMenu() && interaction.customId === 'crafting_menu_gloante') {
    const glont = recipes.gloante[interaction.values[0]];
    if (glont) {
      const embedGlont = new EmbedBuilder()
        .setTitle(`🟡 Muniție: ${glont.nume}`)
        .setDescription(`Batch: **${glont.batch} gloanțe**`)
        .setColor('#f39c12');

      let casing = ''; for (let m in glont.casing) casing += `• ${m}: \`${glont.casing[m]}x\`\n`;
      let fill = ''; for (let m in glont.fill) fill += `• ${m}: \`${glont.fill[m]}x\`\n`;

      embedGlont.addFields(
        { name: '⚙️ Casing', value: casing || '-', inline: true },
        { name: '🧪 Umplutură', value: fill || '-', inline: true }
      );
      return interaction.reply({ embeds: [embedGlont], ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN);