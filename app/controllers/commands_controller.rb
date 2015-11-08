class CommandsController < ApplicationController

  # GET /commands
  # GET /commands.json
  def index

  end

  # GET /commands/:user_level
  # GET /commands/:user_level.json
  def show
    user_level = params[:user_level].to_s
    if params[:below] != 'on'
      case user_level
        when 'INTERNAL'
          user_level = %w(DEFAULT SUBSCRIBER REGULAR MODERATOR SUPER_MODERATOR BROADCASTER INTERNAL)
        when 'BROADCASTER'
          user_level = %w(DEFAULT SUBSCRIBER REGULAR MODERATOR SUPER_MODERATOR BROADCASTER)
        when 'SUPER_MODERATOR'
          user_level = %w(DEFAULT SUBSCRIBER REGULAR MODERATOR SUPER_MODERATOR)
        when 'MODERATOR'
          user_level = %w(DEFAULT SUBSCRIBER REGULAR MODERATOR)
        when 'REGULAR'
          user_level = %w(DEFAULT SUBSCRIBER REGULAR)
        when 'SUBSCRIBER'
          user_level = %w(DEFAULT SUBSCRIBER)
        when 'ALL'
          user_level = %w(DEFAULT SUBSCRIBER REGULAR MODERATOR SUPER_MODERATOR BROADCASTER INTERNAL)
        else
          user_level = user_level
      end
    end
    if user_level == 'ALL'
      user_level = %w(DEFAULT SUBSCRIBER REGULAR MODERATOR SUPER_MODERATOR BROADCASTER INTERNAL)
    end
    commands = Command.where execUserLevel: user_level
    commands.to_a.sort!
    unless params[:command].nil?
      @commands = commands
      return
    end
    render :partial => 'commands', :object => commands
  end

  # GET /commands/new
  def new
  end

  # GET /commands/1/edit
  def edit
  end

  # POST /commands
  # POST /commands.json
  def create

  end

  # PATCH/PUT /commands/1
  # PATCH/PUT /commands/1.json
  def update

  end

  # DELETE /commands/1
  # DELETE /commands/1.json
  def destroy

  end

end
