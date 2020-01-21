$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main-chat__message-list__message" data-message-id=${message.id}>
         <div class="main-chat__message-list__message__top">
           <div class="main-chat__message-list__message__top__name">
             ${message.user_name}
           </div>
           <div class="main-chat__message-list__message__top__date">
             ${message.created_at.strftime("%Y年%m月%d日 %H時%M分")}
           </div>
         </div>
         <div class="main-chat__message-list__message__bottom">
           <p class="main-chat__message-list__message__bottom__text">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="main-chat__message-list__message" data-message-id=${message.id}>
         <div class="main-chat__message-list__message__top">
           <div class="main-chat__message-list__message__top__name">
             ${message.user_name}
           </div>
           <div class="main-chat__message-list__message__top__date">
             ${message.created_at}
           </div>
         </div>
         <div class="main-chat__message-list__message__bottom">
           <p class="main-chat__message-list__message__bottom__text">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.main-chat__message-list').append(html);      
    $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
    $('form')[0].reset();
    $('.form__submit').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
});
})
});