package com.travelapp
import android.app.AlarmManager
import android.app.PendingIntent
import android.content.ContentValues
import android.content.Context
import android.content.Intent
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
            }

            val uri = cr.insert(CalendarContract.Events.CONTENT_URI, values)
            if (uri != null) {
                val eventId = uri.lastPathSegment?.toLong() ?: throw Exception("Failed to get event ID")
                // Set reminder one day before the event
                setReminder(eventId, startMillis - AlarmManager.INTERVAL_DAY)
                promise.resolve(uri.toString())
            } else {
                promise.reject("Error", "Failed to create event")
            }
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }

    private fun setReminder(eventId: Long, reminderTime: Long) {
        // Create an Intent to trigger the reminder notification
        val intent = Intent(reactApplicationContext, ReminderReceiver::class.java).apply {
            putExtra("eventId", eventId)
        }

        val pendingIntent = PendingIntent.getBroadcast(reactApplicationContext, eventId.toInt(), intent, PendingIntent.FLAG_UPDATE_CURRENT)

        // Set the alarm
        val alarmManager = reactApplicationContext.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        alarmManager.setExact(AlarmManager.RTC_WAKEUP, reminderTime, pendingIntent)

        Log.d("CalendarModule", "Reminder set for event ID $eventId at $reminderTime")
    }

}
