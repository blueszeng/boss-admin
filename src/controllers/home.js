
 const about = async (ctx, next) => {
   await ctx.render('login', {title: 'zengyonguang'})
 }

 const index = async (ctx, next) => {
   if (!ctx.state.isUserSignIn) {
     return ctx.redirect('/user')
   }
  //  await ctx.render('login', {title: 'zengyonguang'})
 }

 export default {
   about,
   index
 }
