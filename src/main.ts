// discord.jsライブラリの中から必要な設定を呼び出し、変数に保存します
import { Client, Events, GatewayIntentBits, Interaction } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

// default exportsのインポート
import hey from './commands/hey';
import dice from './commands/dice';

// クライアントインスタンスと呼ばれるオブジェクトを作成します
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
client.once(Events.ClientReady, () => {
  console.log(`準備OKです! ${client.user?.tag}がログインします。`);
});

//スラッシュコマンドに応答するには、interactionCreateのイベントリスナーを使う必要があります
client.on(Events.InteractionCreate, async (interaction: Interaction) => {

  // スラッシュ以外のコマンドの場合は対象外なので早期リターンさせて終了します
  // コマンドにスラッシュが使われているかどうかはisChatInputCommand()で判断しています
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case hey.data.name:
      // heyコマンドに対する処理
      try {
        await hey.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
        } else {
          await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
        }
      }
      break;
    case dice.data.name:
      // diceコマンドに対する処理
      try {
        await dice.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
        } else {
          await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
        }
      }
      break;
    default:
      console.error(`${interaction.commandName}というコマンドには対応していません。`);
  }
});

// ログインします
client.login(process.env.DISCORDAPPBOTTOKEN);
