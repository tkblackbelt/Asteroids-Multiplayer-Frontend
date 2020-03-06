import React from 'react';
import Button from "../common/Button";

const style = {
    root: {
        fontSize: '1.5em',
        zIndex: 9999,
    },
    container: {
        backgroundColor: 'black',
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid green',
        overflow: 'scroll'
    },
    content: {
        fontFamily: 'serif',
        fontSize: '.7em',
        textAlign: 'left',
        padding: 10
    },
    technologies: {
        display: "flex",
        flexDirection: "row"
    },
    technologies_header: {
        textAlign: 'center'
    },
    links: {
        display: "flex",
        flexDirection: "column",
    },
    link: {
        color: 'white'
    }
};

export default function About({ open, onClose }) {
    if (open) {
        return <div className="ui-root" style={style.root}>
            <div className="ui-container" style={style.container}>
                <h3>About</h3>
                <div style={style.content}>
                    <p>Developed by Chuck Benger</p>
                    <p>Asteroids game that supports online and offline play.
                        There may not be anyone online so just open multiple browser windows to see
                        a demonstration of how the multiplayer functions :)
                    </p>
                    <div style={style.links}>
                        <p>And here's the code you are interested!</p>
                        <a style={style.link} href="https://github.com/tkblackbelt/Asteroids-Multiplayer-Backend" target="_blank">Backend Code</a>
                        <a style={style.link} href="https://github.com/tkblackbelt/Asteroids-Multiplayer-Frontend" target="_blank">Frontend Code</a>
                    </div>
                    <p>Built using the following technologies.</p>
                    <div style={style.technologies}>
                        <div>
                            <p style={style.technologies_header}>Frontend</p>
                            <ul>
                                <li>JavaScript (ES6)</li>
                                <li>React + Redux</li>
                                <li>HTML5 Canvas</li>
                                <li>Webpack</li>
                            </ul>
                        </div>
                        <div>
                            <p style={style.technologies_header}>Backend</p>
                            <ul>
                                <li>Python3</li>
                                <li>Flask</li>
                                <li>Docker</li>
                            </ul>
                        </div>
                        <div>
                            <p style={style.technologies_header}>Cloud (AWS)</p>
                            <ul>
                                <li>Fargate</li>
                                <li>DynamoDB</li>
                                <li>API Gateway + ALB</li>
                                <li>Lambda</li>
                                <li>SQS</li>
                                <li>Cloudformation</li>
                                <li>Code Pipeline</li>
                                <li>S3</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Button text="Close" style={{ marginTop: '20px' }} onClick={onClose} />
            </div>
        </div>
    } else {
        return React.Fragment;
    }
};