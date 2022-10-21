const SubscriberPublisherController = (()=>{
  function subscription(eventName, func, priority, excludeSelf = true){
    this.eventName = eventName;
    this.func = func;
    this.priority = priority;
    this.excludeSelf = excludeSelf;
  }
  function subscriptionList(){
    this.list = {
      //eventName: [subscription, subscription]
      //eventName2: [subscription, subscription, subscription]
    }
  }
    subscriptionList.prototype = {
      addSubscription: function(subscription){
        const {eventName} = subscription;
        if(this.list[eventName] instanceof Array){
          this.list[eventName].push(subscription);
          this.list[eventName].sort((a,b) => a.priority-b.priority);
        } else {
          this.list[eventName] =  [subscription];
        }
      },
      removeSubscription: function(subscription){
        const {eventName} = subscription;
        if(this.list[eventName] instanceof Array){
          
        }
      },
      getSubscriptions: function(eventName){
        return this.list[eventName];
      }
    }
  const _subscriptions = new subscriptionList();

  function  publish(eventName, passedVal = {}){ 
    const eventsList = _subscriptions.getSubscriptions(eventName);
    eventsList.forEach(subscription => { 
      subscription.func(passedVal);
    }); 
  }
  function _subscribe(...subscriptions){
    subscriptions.forEach(subscription => {
      _subscriptions.addSubscription(subscription);
      this.subscriptions.addSubscription(subscription);
    })
  }
  function unsubscribe(...subscriptions){

  }
  
  function subscriberWrapper(object){ 
    object.subscribe = _subscribe;
    object.subscriptions = new subscriptionList();
  } 
  function publisherWrapper(object){ 
    object.publish =  publish; 
  }
  function wrapper(object){ 
    subscriberWrapper(object);
    publisherWrapper(object);
  }  
  return {wrapper, subscription, publish, subscriberWrapper, publisherWrapper} 
 })

 export default SubscriberPublisherController;