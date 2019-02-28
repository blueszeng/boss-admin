const extendMsgStatus = (ctx, msg) => {
    msg.sysStatus = ctx.query.sysStatus
    msg.sysMsg = ctx.query.sysMsg
    return msg
}

export default {
    extendMsgStatus
}