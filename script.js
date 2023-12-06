// import { createStore } from 'https://cdn.skypack.dev/react-redux';
////store hand/////////////
function createStore(reducer) {
    let state = reducer(undefined, {}); // Chú ý sử dụng reducer để khởi tạo state

    return {
        getState() {
            return state;
        },
        dispatch(action) { // Thêm tham số action
            state = reducer(state, action);
        },
        subscribe(listener) { // Thêm tham số listener
            listener(); // Gọi listener mỗi khi state thay đổi
        }
    };
}

const initState = 0;

// Reducer
function bankReducer(state = initState, action) {
    switch (action.type) {
        case 'DEPOSIT':
            return state + action.payload;
        case 'WITHDRAW':
            return state - action.payload;
        default:
            return state;
    }
}

// Store
const store = window.store = createStore(bankReducer);

// Actions
function adeposit(payload) {
    return {
        type: "DEPOSIT",
        payload
    };
}

function awithdraw(payload) {
    return {
        type: "WITHDRAW",
        payload
    };
}

// DOM events
const deposit = document.querySelector('#deposit');
const withdraw = document.querySelector('#withdraw');

// Event handlers
deposit.onclick = function () {
    store.dispatch(adeposit(10));
    store.subscribe(render); // Thêm đăng ký lại cho sự kiện
};

withdraw.onclick = function () {
    store.dispatch(awithdraw(10));
    store.subscribe(render); // Thêm đăng ký lại cho sự kiện
};

// Listener
function render() {
    const output = document.querySelector('#output');
    output.innerText = store.getState();
}

// Render
render();
