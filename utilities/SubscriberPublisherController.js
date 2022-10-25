const SubscriberPublisherController = (()=>{
  const logging = true;
  function Subscription(eventName, func, {priority, excludesSelf} = {priority: 0, excludesSelf: false}){
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
      console.log(`%cPublish Event: ${eventName}`, "background: yellow; color: blue; font-size: large");
      console.log('%cPassed Value', "font-size: large")
      console.log(passedVal);
      console.log('%c_subscriptions', "font-size: large")
      console.log(_subscriptions);
    }
    const eventsList = _subscriptions.getSubscriptions(eventName);
    if(eventsList instanceof Array){
      eventsList.forEach(subscription => {
        if(logging){
          console.log(`%cFunc Ran: ${eventName}`, "background: orange; color: blue;");
          console.log(subscription.func);
        }
        subscription.func(passedVal);
      }); 
    }
  }
  function _subscribe(...subscriptions){
    subscriptions.forEach(subscription => {
      if(logging){
        console.log(`%cSubscription Event: ${subscription.eventName}`, "background: green; color: white; font-size: large");
        console.log('%cthis', "font-size: large")
        console.log(this);
        console.log('%csubscription', "font-size: large")
        console.log(subscription);
        console.log('%c_subscriptions', "font-size: large")
        console.log(_subscriptions);
      }
      _subscriptions.addSubscription(subscription);
      this.subscriptions.addSubscription(subscription);
    });
  }
  function _unsubscribe(...subscriptions){
    subscriptions.forEach(subscription=>{
      if(logging){
        console.log(`%cUnSub Event: ${subscription.eventName}`, "background: red; color: white; font-size: large");
        console.log('%cthis', "font-size: large")
        console.log(this);
        console.log('%csubscription', "font-size: large")
        console.log(subscription);
        console.log('%c_subscriptions', "font-size: large")
        console.log(_subscriptions);
      }
      this.subscriptions.removeSubscription(subscription);
      _subscriptions.removeSubscription(subscription);
    })
  }
  function _unsubscribeAll(){
    const SubList = this.subscriptions.list;
    const Subs = [];
    Object.keys(SubList).forEach(key=>{
      Subs.push(...SubList[key])
    });
    Subs.forEach(sub => {
      this.unsubscribe(sub);
    });
  }
  function subscriberWrapper(object){ 
    object.unsubscribe = _unsubscribe;
    object.unsubscribeAll = _unsubscribeAll;
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