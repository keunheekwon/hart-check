/**
 * 수정하셔야 되는 것이 있습니다.
 * 14번째줄과 15번째줄을 수정하셔야 됩니다.
 * 14번째줄은 인덱스 경로로 지정하시면 되고
 * 15번째줄은 링크타서 봇토큰 가져와서 넣으시면 됩니다. ( 링크 : https://koreanbots.dev/developers/applications/ )
 * 오류는 그냥#6001 DM 또는 ! 근짱#1339 DM 오시면 도와드리겠습니다. ( 2차수정(임베드 제외)은 도와드리지 않습니다. )
 */
const {
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const { Koreanbots } = require("koreanbots");
const client = require("../../../base/client");
const token = "한디리 토큰을 입력해주세요.";
const koreanbots = new Koreanbots({
  api: { token: token },
  clientID: client.user.id,
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("하트인증")
    .setDescription("하트인증 코드입니다"),
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async run(interaction) {
    koreanbots.mybot
      .checkVote(interaction.member.user.id)
      .then(async (voted) => {
        console.log(res);
        const not = new EmbedBuilder()
          .setAuthor({
            name: "하트인증실패",
          })
          .setTitle("하트인증에 실패하였습니다. 하트를 눌렀는지 확인해보세요.")
          .setURL(`https://koreanbots.dev/bots/${client.user.id}/vote`)
          .setColor("Red");
        const embed = new EmbedBuilder()
          .setAuthor({
            name: "하트인증성공",
          })
          .setTitle("하트인증을 성공하였습니다.")
          .setColor("Green");
        if (voted.voted === true)
          return await interaction.reply({ embeds: [embed] });
        else return await interaction.reply({ embeds: [not] });
      })
      .catch((e) => {
        console.error(e);
      });

    return await interaction.reply({
      content: "잘못된 경로로 진입하셨습니다.",
    });
  },
};
