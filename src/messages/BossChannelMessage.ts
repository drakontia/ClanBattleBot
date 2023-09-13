import { ActionRowBuilder, EmbedBuilder, TextBasedChannel, ButtonBuilder} from "discord.js"

import button_declaration from "../commands/button/declaration_start"
import button_report_shave from "../commands/button/report_shave"
import button_report_defeat from "../commands/button/report_defeat"
import button_declaration_cancel from "../commands/button/declaration_cancel"
import Clan from "../entity/Clan"
import Boss from "../entity/Boss"
import Declaration from "../entity/Declaration"

export async function sendMessage(channel: TextBasedChannel, clan: Clan, boss: Boss, declaration: Declaration[], isInit: boolean) {
  let declarationMember = '凸宣言者なし'
  // コンポーネント定義
  const embed = new EmbedBuilder().setTitle(boss.bossid +"ボス").setColor("#00ff00").setFields(
    {
      name: 'クラン名',
      value: clan.name
    },
    // TODO: 今後実装
    // {
    //   name: '周回数',
    //   value: "1周目"
    // },
    // TODO: 今後実装
    // {
    //   name: 'HP',
    //   value: 'hogehoge:TODO'
    // },
    {
      name: '凸宣言者',
      value: declarationMember
    }
  )

  await channel.send({
    embeds: [
      embed.toJSON() as any
    ],
    components: [
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        button_declaration.data,
        button_report_shave.data,
        button_report_defeat.data,
        button_declaration_cancel.data
      ),
    ]
  })
}

export default {
  sendMessage
}
