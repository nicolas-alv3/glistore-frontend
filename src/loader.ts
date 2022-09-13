export default `
body{
display: block;
}
#globalLoader{
    position: fixed;
    z-index: 1700;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: lightgray;
    object-fit:cover;
    display: flex;
    left: 0,
    right: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}

.background {
    overflow:hidden;
    transform: translate(45%, 45%);
    width: 1000%;
    height: 1000%;
    position: absolute;
}

.logo {
    border-radius: 8px;
    backdrop-filter: blur(2000px);
    width: 22em;
    height: 22em;
    z-index:100;
}

.backdrop {
    position:absolute;
    width:100vw;
    height: 100vh;
    color:red;
    backdrop-filter: blur(20px);
}

.hidden {
  width: 22em;
  height: 22em;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 2s, opacity 2s ease;
}
`;