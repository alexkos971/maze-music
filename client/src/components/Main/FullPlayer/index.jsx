import React from 'react';
import '../Main.scss';

const FullPlayer = ({ full, nowSong }) => {
    
    return (
        <div className={full ? "music__main-full-active" : "music__main-full"}>

            <div className="music__main-full-info">
                <h1>{nowSong.name}</h1>

                <span>Artist: <span>{nowSong.artist}</span></span>
                <span>Albums: <span>{nowSong.albums}</span></span>
            </div>

            <div className="music__main-full-cover">
                <div className="music__main-full-cover-container">
                    <img src={nowSong.cover} alt=""/>
                </div>
            </div>

            <div className="music__main-full-lyrics">
                <h3>Lyrics:</h3>
            
                <span>
                    Бабушка думает, я умру,<br/> 
                    Если стану водиться с вами. <br/>
                    Приходить постоянно странным к утру.<br/>
                    Мы поедим в другой район. <br/>
                    Встретим Сашу, поймем, что Саша Наркотически объебашенный груд.<br/><br/>
                    
                    Мы вернемся домой,<br/> 
                    Будем молча смотреть Как кончается день,<br/> 
                    Как взрывается дождь.<br/> 
                    Что у тебя в душе?<br/> 
                    Ты никуда уже не уйдешь. <br/><br/>

                    Ты не любишь моих звонков.<br/> 
                    Их я думаю бросить делать. <br/>
                    Хотя, хотя бы раз в неделю готов. <br/>
                    Буря времени сносит всё. <br/>
                    Мы дрейфуем на разных льдинах. <br/>
                    Как-то встретились в магазине и всё. <br/><br/>
                    
                    Ты забыла давно самый солнечный год 92-ой. <br/>
                    Ну, чего же ты ждешь? <br/>
                    Что у тебя в душе Ты никогда уже не поймешь. <br/>
                    Что у тебя в душе Ты ничего уже не вернешь. <br/><br/>
                    
                    От тебя никаких вестей. <br/>
                    Дни, недели, десятилетия. <br/>
                    Никому неизвестно, где ты теперь. <br/>
                    "Лох" написано на стене. <br/>
                    Осень сыпет на лужи листья. <br/>
                    Здесь темнеет быстро и никого нет (нет, нет) <br/><br/>
                    
                    Я пройду через двор, <br/>
                    Через редкие сны в 92-ой, <br/>
                    Где ты всё еще ждешь. <br/>
                    Что у тебя в душе? <br/>
                    Ты никуда уже не уйдешь. <br/>
                    Что у тебя в душе Ты ничего уже не вернёшь<br/></span>
                 
            </div>
        </div>
    )
}

export default FullPlayer;