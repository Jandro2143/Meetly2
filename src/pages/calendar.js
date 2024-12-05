import React, { useState, useEffect } from "react";
import "../css/calendar.css";

function Calendar() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [bookedSlots, setBookedSlots] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState({
    Morning: [],
    Afternoon: [],
    Evening: [],
  });

  const allTimes = [
    { time: "8:00 AM", period: "Morning" },
    { time: "9:00 AM", period: "Morning" },
    { time: "10:00 AM", period: "Morning" },
    { time: "11:00 AM", period: "Morning" },
    { time: "12:00 PM", period: "Afternoon" },
    { time: "1:00 PM", period: "Afternoon" },
    { time: "2:00 PM", period: "Afternoon" },
    { time: "3:00 PM", period: "Afternoon" },
    { time: "4:00 PM", period: "Afternoon" },
    { time: "5:00 PM", period: "Evening" },
    { time: "6:00 PM", period: "Evening" },
  ];

  useEffect(() => {
    const fetchBookedSlots = async () => {
      const dummyData = {
        "2024-12-10": ["8:00 AM", "9:00 AM", "12:00 PM"],
        "2024-12-11": ["10:00 AM", "11:00 AM", "4:00 PM"],
      };
      setBookedSlots(dummyData);
    };
    fetchBookedSlots();
  }, []);

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
  };

  const handleDateClick = (date) => {
    if (selectedDate !== date) {
      setSelectedTime("");
      setAvailableTimes({ Morning: [], Afternoon: [], Evening: [] });
    }

    setSelectedDate(date);

    const bookedTimes = bookedSlots[date] || [];
    const periods = { Morning: [], Afternoon: [], Evening: [] };

    allTimes.forEach((slot) => {
      if (!bookedTimes.includes(slot.time)) {
        periods[slot.period].push(slot.time);
      }
    });

    setAvailableTimes(periods);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    const bookingData = {
      date: selectedDate,
      time: selectedTime,
      first_name: e.target.elements.first_name.value,
      last_name: e.target.elements.last_name.value,
      email: e.target.elements.email.value,
      phone_number: e.target.elements.phone_number.value,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
  
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Failed to create booking. Please try again.");
    }
  };
  

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const isFullyBooked = (date, period) => {
    const periodTimes = allTimes.filter((slot) => slot.period === period).map((slot) => slot.time);
    return (
      bookedSlots[date] &&
      periodTimes.every((time) => bookedSlots[date].includes(time))
    );
  };

  return (
    <div className="calendar-container">
      <h1>Booking Calendar</h1>

      {/* Calendar Header */}
      <div className="calendar-header">
        <button onClick={handlePreviousMonth}>&lt;</button>
        <h2>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>

      {/* Calendar Grid */}
      <div className="calendar">
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const dayString = `${currentYear}-${(currentMonth + 1)
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

          const isSelected = dayString === selectedDate;

          return (
            <div
              key={dayString}
              className={`day ${isSelected ? "selected" : ""}`}
              onClick={() => handleDateClick(dayString)}
            >
              <span>{day}</span>
              <div className="indicators">
                {["Morning", "Afternoon", "Evening"].map((period) => (
                  <div
                    key={period}
                    className={`indicator ${
                      isFullyBooked(dayString, period) ? "booked" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Available Time Slots */}
      {selectedDate && (
        <div className="time-slots">
          <h3>Available Times for {selectedDate}</h3>
          <div className="time-columns">
            {["Morning", "Afternoon", "Evening"].map((period) => (
              <div key={period} className="time-column">
                <h4>{period}</h4>
                {availableTimes[period].length > 0 ? (
                  availableTimes[period].map((time, index) => (
                    <div
                      key={index}
                      className={`time-slot ${
                        time === selectedTime ? "selected" : ""
                      }`}
                      onClick={() => handleTimeClick(time)}
                    >
                      {time}
                    </div>
                  ))
                ) : (
                  <div className="no-slots">No slots available</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Form */}
      {selectedTime && (
        <form id="booking-form" onSubmit={submitBooking}>
          <h3>Book an Appointment</h3>
          <label>
            First Name:
            <input type="text" name="first_name" required />
          </label>
          <label>
            Last Name:
            <input type="text" name="last_name" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Phone Number:
            <input type="tel" name="phone_number" required />
          </label>
          <button type="submit">Confirm Booking</button>
        </form>
      )}
    </div>
  );
}

export default Calendar;
