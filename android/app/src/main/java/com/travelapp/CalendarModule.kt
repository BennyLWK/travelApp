package com.travelapp

import android.content.ContentValues
import android.provider.CalendarContract
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.util.Log
import com.facebook.react.bridge.Promise
import java.text.SimpleDateFormat
import java.util.*

class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "CalendarModule"

    override fun getConstants(): MutableMap<String, Any> =
        hashMapOf("DEFAULT_EVENT_NAME" to "New Event")

    @ReactMethod
    fun createCalendarEvent(name: String, latitude: Double, longitude: Double, firstDate:String, secondDate:String,promise: Promise) {
        Log.d("CalendarModule", "Create event called with name: $name and location: $latitude and date: $firstDate and $secondDate")
        try {
            val cr = reactApplicationContext.contentResolver

            val dateFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())

            val startDate: Date = dateFormat.parse(firstDate) ?: throw Exception("Invalid start date")
            val endDate: Date = dateFormat.parse(secondDate) ?: throw Exception("Invalid end date")

            val startMillis = startDate.time
            val endMillis = endDate.time

            // Format the latitude and longitude as a string
            val eventLocation = "$latitude, $longitude"

            val values = ContentValues().apply {
                put(CalendarContract.Events.DTSTART, startMillis)
                put(CalendarContract.Events.DTEND, endMillis)
                put(CalendarContract.Events.TITLE, name)
                put(CalendarContract.Events.EVENT_LOCATION, eventLocation)
                put(CalendarContract.Events.CALENDAR_ID, 1) // Calendar ID (Make sure it exists)
                put(CalendarContract.Events.EVENT_TIMEZONE, TimeZone.getDefault().id)
                put(CalendarContract.Events.HAS_ALARM, 1)
            }

            val uri = cr.insert(CalendarContract.Events.CONTENT_URI, values)
            if (uri != null) {
                val eventId = uri.lastPathSegment?.toLong() ?: throw Exception("Failed to get event ID")

                // Set reminder one day before the event
                val otherValues = ContentValues().apply {
                    put(CalendarContract.Reminders.MINUTES, 24*60)
                    put(CalendarContract.Reminders.EVENT_ID, eventId)
                    put(CalendarContract.Reminders.METHOD, CalendarContract.Reminders.METHOD_ALERT)
                }
                val ret = cr.insert(CalendarContract.Reminders.CONTENT_URI, otherValues)
                Log.d("CalendarModule", "Reminder set for event ID $eventId")

                promise.resolve(uri.toString())
            } else {
                promise.reject("Error", "Failed to create event")
            }
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }

}
