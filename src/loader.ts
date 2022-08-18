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
    background-color: #D2A78F;
    display: flex;
    left: 0,
    right: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}
.loader img {
    width: 22em;
    height: 22em;
}

.hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 2s, opacity 2s ease;
}
`;