const byebyeImg = () => {
  /*

██████╗ ██╗   ██╗███████╗██████╗ ██╗   ██╗███████╗
██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗╚██╗ ██╔╝██╔════╝
██████╔╝ ╚████╔╝ █████╗  ██████╔╝ ╚████╔╝ █████╗
██╔══██╗  ╚██╔╝  ██╔══╝  ██╔══██╗  ╚██╔╝  ██╔══╝
██████╔╝   ██║   ███████╗██████╔╝   ██║   ███████╗
╚═════╝    ╚═╝   ╚══════╝╚═════╝    ╚═╝   ╚══════╝

*/
};

const byebye = () => byebyeImg.toString().substring(byebyeImg.toString().indexOf('/*') + 3, byebyeImg.toString().lastIndexOf('*/'));

module.exports = byebye;