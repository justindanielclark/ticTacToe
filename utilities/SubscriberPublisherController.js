const SubscriberPublisherController = (()=>{
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
    const eventsList = _subscriptions.getSubscriptions(eventName);
    if(eventsList instanceof Array){
      eventsList.forEach(subscription => { 
        subscription.func(passedVal);
      }); 
    }
  }
  function _subscribe(...subscriptions){
    subscriptions.forEach(subscription => {
      _subscriptions.addSubscription(subscription);
      this.subscriptions.addSubscription(subscription);
    });
  }
  function unsubscribe(...subscriptions){
    //TODO
    subscriptions.forEach(subscription=>{
      this.subscriptions.removeSubscription(subscription);
      _subscriptions.removeSubscription(subscription);
    })
  }
  function subscriberWrapper(object){ 
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