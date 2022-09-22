
module.exports = {

  startHelperInit(process: any) {

    // deafult environmentTag: dev and environmentType: api
    let starterObject = {
      environmentTag : 'dev',
    }
    if(process && process.argv && process.argv.length > 0){
      console.log(process.argv);
      let environmentTag = process.argv[2] // dev | uat | qa | staging | prod
      let environmentType = process.argv[3] // api | cron

      if(environmentTag){
        starterObject.environmentTag = environmentTag
      }

    }

    return starterObject
  }
}
