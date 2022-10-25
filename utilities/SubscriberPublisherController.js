const SubscriberPublisherController = (()=>{
  const logging = false;
  function Subscription(eventName, func, {priority, excludesSelf} = {priority: 0, excludesSelf: true}){
    this.eventName = eventName;
    this.func = func;
    this.priority = priority === undefined ? 0 : priority;
    this.excludeSelf = excludesSelf === undefined ? true : excludesSelf;
  }
  function SubscriptionList(){
    this.list = {
      //eventName: [subscription, subscription]
      //eventName2: [subscription, subscription, subscription]
    }
  }
    SubscriptionList.prototype = {
      addSubscription: function(subscription){
        const {eventName} = subscription;
        if(this.list[eventName] instanceof Array){
          this.list[eventName].push(subscription);
          this.list[eventName].sort((a,b) => a.priority-b.priority);
        } else {
          this.list[eventName] = [subscription];
        }
      },
      removeSubscription: function(subscription){
        const {eventName} = subscription;
        const eventsArray = this.list[eventName];
        if(eventsArray instanceof Array){
          const eventIndex = eventsArray.indexOf(subscription);
          if(eventIndex>=0){
            eventsArray.splice(eventIndex, 1);
          }
        }
      },
      getSubscriptions: function(eventName){
        return this.list[eventName];
      }
    }
  function publish(eventName, passedVal = {}){
    if(logging){
      console.log(`%cPublish Event: ${eventName}`, "background: #213; font-size: large");
      console.log(_subscriptions);
    }
    const eventsList = _subscriptions.getSubscriptions(eventName);
    if(eventsList instanceof Array){
      eventsList.forEach(subscription => {
        if(logging){console.log(subscription.func);}
        subscription.func(passedVal);
      }); 
    }
  }
  function _subscribe(...subscriptions){
    subscriptions.forEach(subscription => {
      if(logging){
        console.log(`%cSubscription Event: ${subscription.eventName}`, "background: #123; font-size: large");
        console.log(new Date().toUTCString())
        console.log(subscription);
        console.log(this);
      }
      _subscriptions.addSubscription(subscription);
      this.subscriptions.addSubscription(subscription);
    });
  }
  function _unsubscribe(...subscriptions){
    subscriptions.forEach(subscription=>{
      if(logging){
        console.log(`%cUnSub Event: ${subscription.eventName}`, "background: #321; font-size: large");
        console.log(_subscriptions);
        console.log(subscription);
        console.log(this);
      }
      this.subscriptions.removeSubscription(subscription);
      _subscriptions.removeSubscription(subscription);
    })
  }
  function subscriberWrapper(object){ 
    object.unsubscribe = _unsubscribe;
    object.subscribe = _subscribe;
    object.subscriptions = new SubscriptionList();
    return object;
  } 
  function publisherWrapper(object){ 
    object.publish =  publish;
    return object;
  }
  function wrapper(object){ 
    subscriberWrapper(object);
    publisherWrapper(object);
  }
  const _subscriptions = new SubscriptionList();

  return {
    publish, 
    publisherWrapper,
    subscriberWrapper, 
    Subscription, 
    wrapper,
  } 
 });

 export default SubscriberPublisherController;