
import '@softleader/flatpickr/dist/themes/material_green.css'
import {MandarinTraditionalMinguo as zhTwMinguo} from '@softleader/flatpickr/dist/l10n/zh-tw-minguo.js';

import React, { Component } from 'react'
import { render } from 'react-dom'

import Flatpickr from '../lib/index.js'


class App extends Component {
  state = {
    v: '2016-01-01 01:01',
    onChange: (_, str) => {
      console.info(str)
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(state => ({
        v: state.v.replace('2016', '2017'),
        onChange: (_, str) => {
          console.info('New change handler: ', str)
        }
      }))
    }, 2000)
  }

  render() {
    const { v } = this.state

    return (
      <main>
        <Flatpickr data-enable-time className='test'
          onChange={[
            (_, str) => console.info(str),
            () => {} // test hookPropType
          ]} />
        <Flatpickr data-enable-time defaultValue='2016-11-11 11:11'
          onChange={(_, str) => console.info(str)} />
        <Flatpickr data-enable-time value={v}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr value={v} options={{minDate: '2016-11-01'}}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr value={[v, '2016-01-10']} options={{mode: 'range'}}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr onChange={this.state.onChange}
          onOpen={() => { console.info('opened (by prop)') }}
          options={{
            onClose: () => {
              console.info('closed (by option)')
            },
            maxDate: new Date()
          }} />
        <Flatpickr value={new Date()}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr value={v} options={{wrap: true}}
          onChange={(_, str) => console.info(str)}
        >
          <input type='text' data-input />
          <button type='button' data-toggle>Toggle</button>
          <button type='button' data-clear>Clear</button>
        </Flatpickr>
        <Flatpickr
          defaultValue='2019-05-05'
          onCreate={(flatpickr) => { this.calendar = flatpickr }}
          onDestroy={() => { delete this.calendar }}
          render={({ defaultValue }, ref)=>{
            return (
              <div>
                <input defaultValue={ defaultValue } ref={ref} />
                <button onClick={() => this.calendar.setDate(new Date())}>Today</button>
              </div>
            )
          }} />
          <hr/>
          <Flatpickr  data-enable-time options={{
            altInput: true,
            altFormat: "C-m-d",
            locale: zhTwMinguo,
            allowInput: true,
            dateFormat: "z",
            beforeSetDate: date => {
              if (typeof date !== "string") {
                return date;
              }
              let reg = /(?<year>\d{3})-?(?<month>\d{2})-?(?<day>\d{2})/;
              let match = date.match(reg);
              if (!match) {
                return "";
              }
              let groups = match.groups;
              return `${("0" + groups.year).slice(-4)}-${groups.month}-${groups.day}`;
            }
          }}
          placeholder="Select minguo date"/>

          <Flatpickr  data-enable-time options={{
            altInput: true,
            altFormat: "C-m-d H:i",
            locale: zhTwMinguo,
            enableTime: true,
            allowInput: true,
            dateFormat: "z",
            beforeSetDate: date => {
              if (typeof date !== "string") {
                return date;
              }
              let reg = /(?<year>\d{3})-?(?<month>\d{2})-?(?<day>\d{2})\s?(?<hour>\d{2})?:?(?<minute>\d{2})?/;
              let match = date.match(reg);
              if (!match) {
                return "";
              }
              let groups = match.groups;
              date = `${("0" + groups.year).slice(-4)}-${groups.month}-${groups.day}`;
              if (groups.hour) date += " " + groups.hour;
              if (groups.minute) date += ":" + groups.minute;
              return date;
            }
          }}
          placeholder="Select minguo datetime"/>
      </main>
    )
  }
}

window.init = () => {
  render(<App />, document.querySelector('#container'))
}
