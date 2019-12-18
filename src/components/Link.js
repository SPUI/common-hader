/**
 * 多链 web 站下, history 跳转 todo
 * @param {String} to       跳转的路径
 * @param {React Node} children 内容
 */
const Link = ({
  to,
  children
}) => {
  return <a href={to}>{children}</a>
}

export default Link;
