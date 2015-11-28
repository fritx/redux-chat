import React, { Component } from 'react';
import ThreadListItem from '../components/ThreadListItem.react';
import sortBy from 'lodash/collection/sortBy';

export default class ThreadSection extends Component {

  render() {
    let unreadCount = 0;

    let threadIdList = Object.keys(this.props.threads)
    threadIdList = sortBy(threadIdList, id => {
      return - this.props.threads[id].lastTimestamp
    })
    let threadListItems = threadIdList.map(id => {
      let thread = this.props.threads[id];
      let lastMessage = this.props.messages[thread.lastMessage];
      if (!lastMessage.isRead) {
        unreadCount += 1;
      }
      return (
        <ThreadListItem
          key={id}
          thread={thread}
          lastMessage={lastMessage}
          currentThreadID={this.props.currentThreadID}
          actions={this.props.actions}
        />
      );
    });

    let unread =
      unreadCount === 0 ? null : <span>Unread threads: {unreadCount}</span>;
    return (
      <div className="thread-section">
        <div className="thread-count">
          {unread}
        </div>
        <ul className="thread-list">
          {threadListItems}
          </ul>
      </div>
    );
  }

};
