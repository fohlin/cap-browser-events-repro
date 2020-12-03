import { Component, h, State } from '@stencil/core';
import { Capacitor, Plugins, PluginListenerHandle } from '@capacitor/core';

const { Browser } = Plugins;

interface ListenerLog {
  listener: PluginListenerHandle
  created: Date,
  called?: Date
}

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @State() listeners: Array<ListenerLog> = [];

  private async openBrowser() {
    const l: ListenerLog = {
      created: new Date(),
      listener: Browser.addListener('browserFinished', () => {
        console.info('Browser browserFinished');
        l.listener.remove();
        l.called = new Date();
        // Update state to trigger render;
        this.listeners = [...this.listeners];
      })
    };
    this.listeners = [...this.listeners, l];

    Browser.open({
      url: 'https://example.com/'
    }).then(() => {
      console.info('Browser open');
    });
  }

  render() {
    return (
      <div>
        <header>
          <h1>Capacitor <code>Browser</code> events</h1>
        </header>
        { Capacitor.isNative
          ?
            <div>
              <button onClick={() => { this.openBrowser(); }}>Open browser</button>
              <p>
                <code>browserFinished</code> listener log ({ this.listeners.length }):
              </p>
              <table>
                <tr>
                  <th></th> <th>Created</th> <th>Called</th>
                </tr>
                { this.listeners.map((l, i) => {
                  return (
                    <tr>
                      <th>{ i }</th>
                      <td>{ l.created.toISOString() }</td>
                      <td>{ l.called?.toISOString() }</td>
                    </tr>
                  );
                }) }
              </table>
            </div>
          :
            <p>
              Please open native version.
            </p>
        }
      </div>
    );
  }
}
